import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { buildLeadEmailHtml, buildLeadAutoReplyHtml } from "@/lib/email";

// --- Rate Limiting (mirrors chat route) ---
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 5; // stricter than chat — form submissions

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

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 5 * 60_000);

const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^[\d\s\-\(\)\+]{7,20}$/)
    .optional()
    .or(z.literal("")),
  service: z.string().max(100).optional(),
  message: z.string().max(500).optional(),
});

const CLINIC_EMAIL = "info@perspectivehealthiowa.com";
const FROM_EMAIL = "Perspective Health <website@perspectivehealthiowa.com>";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many submissions. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const data = leadSchema.parse(body);

    const subjectLine = `Chatbot Lead: ${data.name} — ${data.service || "General Inquiry"}`;

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Send notification to clinic + auto-reply to lead in parallel
      await Promise.all([
        resend.emails.send({
          from: FROM_EMAIL,
          to: CLINIC_EMAIL,
          subject: subjectLine,
          html: buildLeadEmailHtml(data),
        }),
        resend.emails.send({
          from: FROM_EMAIL,
          to: data.email,
          subject: "Thanks for reaching out to Perspective Health!",
          html: buildLeadAutoReplyHtml({ name: data.name }),
        }),
      ]);
    } else {
      // Dev fallback
      console.log("[Chatbot Lead Submission]", {
        timestamp: new Date().toISOString(),
        ...data,
      });
      console.log("[Lead Auto-Reply would be sent to]", data.email);
    }

    return NextResponse.json(
      { success: true, message: "Lead submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 422 }
      );
    }
    console.error("[Chat Lead API Error]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
