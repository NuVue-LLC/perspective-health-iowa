import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { buildEmailHtml, buildContactAutoReplyHtml } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().optional(),
  preferredContact: z.enum(["email", "phone", "either"]),
  message: z.string().min(10).max(1000),
});

const CLINIC_EMAIL = "info@perspectivehealthiowa.com";
const FROM_EMAIL = "Perspective Health <website@perspectivehealthiowa.com>";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Send notification to clinic + auto-reply to person in parallel
      await Promise.all([
        resend.emails.send({
          from: FROM_EMAIL,
          to: CLINIC_EMAIL,
          subject: `New Contact Form Submission — ${data.name}`,
          html: buildEmailHtml(data),
        }),
        resend.emails.send({
          from: FROM_EMAIL,
          to: data.email,
          subject: "We received your message — Perspective Health Iowa",
          html: buildContactAutoReplyHtml({ name: data.name }),
        }),
      ]);
    } else {
      // Dev fallback
      console.log("[Contact Form Submission]", {
        timestamp: new Date().toISOString(),
        ...data,
      });
      console.log("[Contact Auto-Reply would be sent to]", data.email);
    }

    return NextResponse.json(
      { success: true, message: "Message received successfully." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 422 }
      );
    }
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
