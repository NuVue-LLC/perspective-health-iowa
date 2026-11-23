import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// Callback requests from the peptide funnel (/go/peptides/book). This is a
// request for a phone call from the front desk, not an appointment booking.
// Only name, phone and a time window are collected: no health details.
const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a 10-digit phone number"),
  day: z.enum(["Today", "Tomorrow", "This week"]),
  time: z.enum(["Morning", "Afternoon"]),
  company: z.string().max(0).optional(), // honeypot: real people leave it empty
});

const CLINIC_EMAIL = process.env.PEPTIDE_CALLBACK_EMAIL || "info@perspectivehealthiowa.com";
// Sent from NuVue's shared, already-verified Resend sender so no DNS changes
// are needed on the clinic's domain. Set RESEND_FROM to change it later.
const FROM_EMAIL = process.env.RESEND_FROM || "Perspective Health <leads@mail.nuvuepro.com>";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function POST(request: NextRequest) {
  try {
    const data = schema.parse(await request.json());
    const when = `${data.day}, ${data.time.toLowerCase()}`;

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: CLINIC_EMAIL,
        subject: `Callback request: ${data.name} (${when})`,
        html: `<div style="font-family:Arial,sans-serif;font-size:16px;color:#2C2C2C">
<h2 style="color:#057D6B;margin:0 0 12px">Peptide callback request</h2>
<p style="margin:0 0 4px"><strong>Name:</strong> ${esc(data.name)}</p>
<p style="margin:0 0 4px"><strong>Phone:</strong> <a href="tel:${esc(data.phone.replace(/[^\d+]/g, ""))}">${esc(data.phone)}</a></p>
<p style="margin:0 0 16px"><strong>Asked to be called:</strong> ${esc(when)}</p>
<p style="margin:0;color:#4A4A4A">This person answered yes to: in Iowa, 18 or older, and understands the consult is a medical visit that may be covered by insurance. Please call them in that window and schedule by phone as usual.</p>
<p style="margin:16px 0 0;font-size:13px;color:#7b8a85">Sent from the peptide page on perspectivehealthiowa.com, ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })} Central.</p>
</div>`,
      });
      if (error) throw new Error(error.message);
    } else if (process.env.NODE_ENV === "production") {
      // Never report success when nobody will receive the request.
      return NextResponse.json({ success: false, message: "Callbacks are not available" }, { status: 503 });
    } else {
      // Dev fallback: no email service configured.
      console.log("[Peptide Callback Request]", { ...data, when });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.flatten().fieldErrors }, { status: 422 });
    }
    console.error("[Peptide Callback API Error]", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
