import { prisma } from "@/lib/prisma";
import { sendReminderEmail } from "@/lib/email";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const now = new Date();

    const reminders = await prisma.reminder.findMany({
      where: {
        dueDate: { lte: now },
        completed: false,
      },
      include: {
        application: true,
      },
    });

    const results = [];

    for (const reminder of reminders) {
      try {
        if (reminder.application.userEmail) {
          const result = await sendReminderEmail(
            reminder.application.userEmail,
            reminder.application.position,
            reminder.type,
            reminder.application.company,
          );

          if (result.error) {
            console.error(
              `Failed to send email for reminder ${reminder.id}:`,
              result.error,
            );
            results.push({
              reminderId: reminder.id,
              status: "email_failed",
              error: result.error,
            });
            continue;
          }
        }

        await prisma.reminder.update({
          where: { id: reminder.id },
          data: { completed: true },
        });

        results.push({ reminderId: reminder.id, status: "success" });
      } catch (error) {
        console.error(`Error processing reminder ${reminder.id}:`, error);
        results.push({
          reminderId: reminder.id,
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return Response.json({
      sent: reminders.length,
      results,
      successful: results.filter((r) => r.status === "success").length,
      failed: results.filter((r) => r.status !== "success").length,
    });
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process reminders",
        sent: 0,
      },
      { status: 500 },
    );
  }
}
