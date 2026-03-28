import { EmailTemplate } from "@/components/email-reminder";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReminderEmail(
  email: string,
  position: string,
  company: string,
  type: string,
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "HireHunt <reminders@hirehunt.tech>",
      to: email,
      subject: `Reminder: ${type} for ${company}`,
      react: EmailTemplate({ position, type, company }),
    });
    if (error) {
      return { error, status: 500 };
    }
    return { data, status: 200 };
  } catch (error) {
    console.error(
      `Unexpected error sending reminder email to ${email}:`,
      error,
    );
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
      status: 500,
    };
  }
}
