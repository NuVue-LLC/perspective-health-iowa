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

    // FAQ shortcut — instant answers for common questions (works without API key)
    if (lastMessage.role === "user") {
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
    if (userMessageCount >= 4) {
      fullSystemPrompt += `\n\n[Internal note: The user has asked ${userMessageCount} questions now. If you haven't already offered, this would be a natural time to offer to "have our team reach out" to them. Keep it brief and natural — only if it fits the conversation flow.]`;
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
        max_tokens: 500,
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
    const assistantMessage = data.content?.[0]?.text;

    if (!assistantMessage) {
      return NextResponse.json({
        message: FALLBACK_MESSAGE,
      });
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
