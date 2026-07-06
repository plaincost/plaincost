import { Resend } from "resend";
import {
  waitlistConfirmationHtml,
  waitlistConfirmationText,
} from "@/lib/emails/waitlist-confirmation";

let resend: Resend | null = null;

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  if (!resend) {
    resend = new Resend(apiKey);
  }

  return resend;
}

export async function sendWaitlistConfirmationEmail(
  to: string,
): Promise<{ sent: boolean; error?: string }> {
  const client = getResendClient();
  const from = process.env.RESEND_FROM_EMAIL;

  if (!client || !from) {
    console.warn("Resend is not configured; skipping waitlist confirmation email.");
    return { sent: false, error: "Resend is not configured." };
  }

  const { error } = await client.emails.send({
    from,
    to: [to],
    subject: "You're on the PlainCost waitlist",
    html: waitlistConfirmationHtml(),
    text: waitlistConfirmationText(),
  });

  if (error) {
    console.error("Waitlist confirmation email failed:", error.message);
    return { sent: false, error: error.message };
  }

  return { sent: true };
}