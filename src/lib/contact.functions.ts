import { createServerFn } from "@tanstack/react-start";

type ContactInquiry = {
	name: string;
	email: string;
	message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown, maximumLength: number) {
	return typeof value === "string"
		? value
				.trim()
				.replace(/[\r\n]+/g, " ")
				.slice(0, maximumLength)
		: "";
}

function escapeHtml(value: string) {
	return value.replace(/[&<>"']/g, (character) => {
		return (
			{
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#39;",
			}[character] ?? character
		);
	});
}

function contactEmailHtml({ name, email, message }: ContactInquiry) {
	const safeName = escapeHtml(name);
	const safeEmail = escapeHtml(email);
	const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");

	return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#eeeeee;color:#000000;font-family:Inter,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#eeeeee;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;background:#ffffff;">
          <tr><td style="padding:28px 32px;background:#000000;color:#ffffff;">
            <p style="margin:0 0 8px;color:#ffcc12;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">New growth inquiry</p>
            <h1 style="margin:0;color:#ffffff;font-size:38px;line-height:1;font-weight:800;letter-spacing:-1.5px;">BRIVIO</h1>
          </td></tr>
          <tr><td style="height:8px;background:#ffcc12;font-size:0;line-height:0;">&nbsp;</td></tr>
          <tr><td style="padding:36px 32px 16px;">
            <h2 style="margin:0 0 12px;font-size:30px;line-height:1.1;letter-spacing:-1px;">A new conversation is ready.</h2>
            <p style="margin:0;color:#4b4b4b;font-size:16px;line-height:1.65;">Someone has asked Brivio to help unlock their next stage of growth.</p>
          </td></tr>
          <tr><td style="padding:16px 32px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f3f3f1;border-left:4px solid #ef0612;">
              <tr><td style="padding:20px 22px;">
                <p style="margin:0 0 5px;color:#555555;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Contact</p>
                <p style="margin:0 0 18px;font-size:20px;font-weight:700;">${safeName}</p>
                <p style="margin:0 0 5px;color:#555555;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Work email</p>
                <p style="margin:0;font-size:16px;"><a href="mailto:${safeEmail}" style="color:#000000;font-weight:700;">${safeEmail}</a></p>
              </td></tr>
            </table>
          </td></tr>
          <tr><td style="padding:16px 32px 36px;">
            <p style="margin:0 0 10px;color:#555555;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Growth goal</p>
            <p style="margin:0;color:#171717;font-size:16px;line-height:1.7;">${safeMessage}</p>
          </td></tr>
          <tr><td style="padding:20px 32px;background:#000000;color:#bcbcbc;font-size:12px;line-height:1.5;">Brivio · Performance-first digital agency</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function validateInquiry(value: unknown): ContactInquiry {
	if (!value || typeof value !== "object") {
		throw new Error("Invalid inquiry.");
	}

	const { name, email, message } = value as Record<string, unknown>;
	const inquiry = {
		name: cleanText(name, 120),
		email: cleanText(email, 254),
		message: typeof message === "string" ? message.trim().slice(0, 5_000) : "",
	};

	if (!inquiry.name || !emailPattern.test(inquiry.email) || !inquiry.message) {
		throw new Error("Please complete every field with a valid email address.");
	}

	return inquiry;
}

export const sendContactInquiry = createServerFn({ method: "POST" })
	.validator(validateInquiry)
	.handler(async ({ data }) => {
		const apiKey = process.env.RESEND_API_KEY;
		const from = process.env.RESEND_EMAIL_FROM;
		const recipient = process.env.CONTACT_EMAIL_TO;

		if (!apiKey || !from || !recipient) {
			if (import.meta.env.DEV) {
				console.error("Contact email is missing its Resend configuration.");
			}
			throw new Error("Email service is unavailable.");
		}

		const response = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from,
				to: [recipient],
				reply_to: data.email,
				subject: `Growth inquiry from ${data.name}`,
				text: `Name: ${data.name}\nWork email: ${data.email}\n\nGrowth goal:\n${data.message}`,
				html: contactEmailHtml(data),
			}),
		});

		if (!response.ok) {
			if (import.meta.env.DEV) {
				console.error("Resend rejected a contact inquiry.", response.status);
			}
			throw new Error("Email service is unavailable.");
		}

		return { sent: true };
	});
