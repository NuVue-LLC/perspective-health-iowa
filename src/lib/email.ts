export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  preferredContact: string;
  message: string;
}

export function buildEmailHtml(data: ContactEmailData): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #5BBCD6;">New Contact Form Submission</h2>
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
