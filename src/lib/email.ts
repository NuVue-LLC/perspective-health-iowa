export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  preferredContact: string;
  message: string;
}

export interface LeadEmailData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
}

const FOOTER_HTML = `
  <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #999;">
    <p>Perspective Health Iowa · 8860 Northpark Dr., Suite 200, Urbandale, IA 50131</p>
    <p>(515) 724-0377 · info@perspectivehealthiowa.com</p>
  </div>
`;

export function buildEmailHtml(data: ContactEmailData): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #00BCD4;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold; width: 40%;">Name:</td><td style="padding: 8px;">${data.name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${data.phone || "Not provided"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Service:</td><td style="padding: 8px;">${data.service || "Not specified"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Preferred Contact:</td><td style="padding: 8px;">${data.preferredContact}</td></tr>
      </table>
      <div style="margin-top: 16px;">
        <strong>Message:</strong>
        <p style="background: #f5f5f5; padding: 12px; border-radius: 8px; white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>
  `;
}

export function buildLeadEmailHtml(data: LeadEmailData): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #7C3AED;">Chatbot Lead: ${data.name} — ${data.service || "General Inquiry"}</h2>
      <p style="color: #666; font-size: 14px;">This lead was captured through the website chatbot.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px; font-weight: bold; width: 40%;">Name:</td><td style="padding: 8px;">${data.name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${data.phone || "Not provided"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Service Interest:</td><td style="padding: 8px;">${data.service || "Not specified"}</td></tr>
      </table>
      ${data.message ? `
      <div style="margin-top: 16px;">
        <strong>Message:</strong>
        <p style="background: #f5f5f5; padding: 12px; border-radius: 8px; white-space: pre-wrap;">${data.message}</p>
      </div>
      ` : ""}
      ${FOOTER_HTML}
    </div>
  `;
}

export function buildLeadAutoReplyHtml(data: { name: string }): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #5BBCD6;">Thanks for reaching out, ${data.name}!</h2>
      <p style="color: #333; font-size: 15px; line-height: 1.6;">
        We received your request and a member of our team will be in touch within <strong>1 business day</strong>.
      </p>
      <p style="color: #333; font-size: 15px; line-height: 1.6;">
        In the meantime, feel free to explore our website or reach us directly:
      </p>
      <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p style="margin: 4px 0; font-size: 14px;"><strong>Phone:</strong> (515) 724-0377</p>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> info@perspectivehealthiowa.com</p>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Address:</strong> 8860 Northpark Dr., Suite 200, Urbandale, IA 50131</p>
      </div>
      <p style="color: #666; font-size: 14px;">We look forward to connecting with you!</p>
      <p style="color: #333; font-size: 14px;">— The Perspective Health Iowa Team</p>
      ${FOOTER_HTML}
    </div>
  `;
}

export function buildContactAutoReplyHtml(data: { name: string }): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #5BBCD6;">We received your message, ${data.name}!</h2>
      <p style="color: #333; font-size: 15px; line-height: 1.6;">
        Thank you for contacting Perspective Health Iowa. A member of our team will review your message and get back to you within <strong>1 business day</strong> via your preferred contact method.
      </p>
      <p style="color: #333; font-size: 15px; line-height: 1.6;">
        If your matter is urgent, please call us directly:
      </p>
      <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p style="margin: 4px 0; font-size: 14px;"><strong>Phone:</strong> (515) 724-0377</p>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> info@perspectivehealthiowa.com</p>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Address:</strong> 8860 Northpark Dr., Suite 200, Urbandale, IA 50131</p>
      </div>
      <p style="color: #333; font-size: 14px;">— The Perspective Health Iowa Team</p>
      ${FOOTER_HTML}
    </div>
  `;
}
