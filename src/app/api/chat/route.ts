import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { buildSystemPrompt, matchFaq, type ChatMessage } from "@/lib/chatbot";
import { SITE_CONFIG } from "@/lib/constants";

// --- Rate Limiting ---
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 20; // max requests per window

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Clean up stale entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 5 * 60_000);

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      })
    )
    .min(1)
    .max(50),
});

const FALLBACK_MESSAGE = `I'm not fully connected yet, but I'd love to help! Please call us at ${SITE_CONFIG.phone} or email ${SITE_CONFIG.email} and our team will be happy to assist you. You can also visit our Contact page to send us a message.`;

const SMART_FALLBACK_MESSAGE = `I'm not sure I have the answer to that one, but I can help with a lot of other things! Try one of the topics below, or call us at ${SITE_CONFIG.phone} for anything specific.`;
const SMART_FALLBACK_SUGGESTIONS = ["Our Services", "Hours & Location", "Insurance & Payment", "New Patient Info", "Meet Our Providers"];

const LEAD_CAPTURE_TRIGGER = "have our team reach out";

// --- PHI Pre-filter ---
// If a user message looks like they're disclosing personal health info, return a
// canned redirect *without* forwarding the message to the LLM. This keeps PHI
// from being transmitted to a third-party API. Tuned to be specific — only fires
// on clear first-person disclosure, not general questions about a service.
const PHI_PATTERNS: RegExp[] = [
  // First-person disclosure of conditions / symptoms
  /\bi\s*(?:'?ve|have|am|was|got|started|keep|been)\b[^.!?]*\b(diagnosed|diabetes|cancer|thyroid|depress|anxiety|adhd|ibs|sibo|menopaus|migraine|insomnia|fatigue|pain|hurts?|sick|sore|infection|hypertens|cholesterol|pregnan|miscarriag|asthma|allerg|eczema|lupus|arthriti|fibromyalg)\b/i,
  // First-person symptom statements
  /\b(my|i)\s+(blood pressure|blood sugar|a1c|cholesterol|tsh|t3|t4|hormone|estrogen|testosterone|periods?|cycle|labs?|test results?|mri|ct scan|x.?ray|biopsy|prescription)\b/i,
  // Medication / dosage disclosures
  /\b(i\s*(?:take|'?m\s+on|started|stopped|tried)|prescribed me)\s+\w+\s*(\d+\s*(mg|mcg|iu|ml|units?))/i,
  // Direct symptom reporting ("I feel/have ...")
  /\bi\s*(?:feel|felt|am feeling|'?m feeling)\s+(nauseous|dizzy|short of breath|chest pain|numb|tingl|swollen|bleeding|cramping|depressed|suicidal|hopeless)/i,
  // Sensitive identifiers
  /\b(ssn|social security|member id|policy number|insurance id)[:\s#]+\w+/i,
  // Asking for medical advice on personal symptoms
  /\b(what|why|should i|do i have|could i have|is it)\b[^.!?]*\b(my\s+(symptom|pain|condition|diagnosis|rash|lump|spot|bleeding))/i,
];

const EMERGENCY_PATTERNS: RegExp[] = [
  /\b(chest pain|can'?t breathe|trouble breathing|stroke|heart attack|overdose|suicid|kill myself|bleeding (a lot|heavily|won'?t stop)|unconscious|seizure)\b/i,
];

function isLikelyPhi(text: string): boolean {
  return PHI_PATTERNS.some((p) => p.test(text));
}

function isEmergency(text: string): boolean {
  return EMERGENCY_PATTERNS.some((p) => p.test(text));
}

const PHI_REDIRECT_MESSAGE = `Thank you for trusting us with that. To protect your privacy, I can't discuss specific health concerns through this chat — but our providers would love to help you personally. Please call us at ${SITE_CONFIG.phone} or use our Contact page to schedule.`;

const EMERGENCY_MESSAGE = `If this is a medical emergency, please call 911 or go to the nearest emergency room right away. For non-urgent concerns, call our office at ${SITE_CONFIG.phone}.`;

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: "You're sending messages too quickly. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const { messages } = parsed.data;
    const lastMessage = messages[messages.length - 1];

    if (lastMessage.role === "user") {
      // Emergency check first — overrides everything else
      if (isEmergency(lastMessage.content)) {
        return NextResponse.json({
          message: EMERGENCY_MESSAGE,
          suggestions: ["Call the office", "Hours & Location"],
        });
      }

      // PHI pre-filter — short-circuit before forwarding to the LLM
      if (isLikelyPhi(lastMessage.content)) {
        return NextResponse.json({
          message: PHI_REDIRECT_MESSAGE,
          suggestions: ["How do I schedule?", "What insurance do you accept?", "Hours & Location"],
        });
      }

      // FAQ shortcut — instant answers for common questions (works without API key)
      const faqMatch = matchFaq(lastMessage.content);
      if (faqMatch) {
        return NextResponse.json({
          message: faqMatch.answer,
          suggestions: faqMatch.suggestions,
          showLeadForm: faqMatch.showLeadForm || false,
        });
      }
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        message: SMART_FALLBACK_MESSAGE,
        suggestions: SMART_FALLBACK_SUGGESTIONS,
      });
    }

    const systemPrompt = buildSystemPrompt();

    // Count user messages to determine if we should nudge lead capture
    const userMessageCount = messages.filter((m) => m.role === "user").length;

    // Build system prompt with lead capture nudge if appropriate
    let fullSystemPrompt = systemPrompt;
    if (userMessageCount >= 2) {
      fullSystemPrompt += `\n\n[Internal note: The user has asked ${userMessageCount} questions. When they show ANY interest or say things like "okay", "sure", "sounds good", "I need that", etc., ALWAYS offer to "have our team reach out" instead of telling them to call. The lead form is easier for them.]`;
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 75,
        system: fullSystemPrompt,
        messages: messages.map((m: ChatMessage) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      console.error("Anthropic API error:", response.status);
      return NextResponse.json({
        message: FALLBACK_MESSAGE,
      });
    }

    const data = await response.json();
    let assistantMessage = data.content?.[0]?.text;

    if (!assistantMessage) {
      return NextResponse.json({
        message: FALLBACK_MESSAGE,
      });
    }

    // Strip markdown formatting
    assistantMessage = assistantMessage.replace(/\*\*/g, "").replace(/\*/g, "");

    // Always cut to the last complete sentence (ending with . ! or ?)
    const lastSentenceEnd = assistantMessage.search(/[.!?][^.!?]*$/);
    if (lastSentenceEnd > 0) {
      assistantMessage = assistantMessage.slice(0, lastSentenceEnd + 1).trim();
    }

    // Then enforce 2 sentence max
    const sentenceEnds = [...assistantMessage.matchAll(/[.!?]+\s/g)];
    if (sentenceEnds.length >= 2) {
      const cutoff = sentenceEnds[1].index! + sentenceEnds[1][0].length;
      assistantMessage = assistantMessage.slice(0, cutoff).trim();
    }

    // Detect lead capture trigger phrase in response
    const showLeadForm = assistantMessage.toLowerCase().includes(LEAD_CAPTURE_TRIGGER);

    return NextResponse.json({
      message: assistantMessage,
      showLeadForm,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      message: FALLBACK_MESSAGE,
    });
  }
}
