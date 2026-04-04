import { prisma } from "@/lib/prisma";
import { overdueReminders, todayReminders, weekReminders } from "./mock-data";
import { ReminderSection } from "./ReminderSection";

export default async function RemindersPage({ userId }: { userId: string }) {
  const now = new Date();
  const weekFromNow = new Date();
  weekFromNow.setDate(now.getDate() + 7);

  const [overdueReminders, weekReminders, futureReminders] = await Promise.all([
    // Overdue reminders
    prisma.reminder.findMany({
      where: {
        application: { userId: userId },
        completed: true,
        dueDate: { lt: now },
      },
      include: { application: true },
      orderBy: { dueDate: "asc" },
    }),

    // Week reminders
    prisma.reminder.findMany({
      where: {
        application: { userId: userId },
        completed: false,
        dueDate: { gte: now, lte: weekFromNow },
      },
      include: { application: true },
      orderBy: { dueDate: "asc" },
    }),

    // Future reminders
    prisma.reminder.findMany({
      where: {
        application: { userId: userId },
        completed: false,
        dueDate: { gt: weekFromNow },
      },
      include: { application: true },
      orderBy: { dueDate: "asc" },
    }),
  ]);
//completed reminders next
  // const result = {
  //   overdueReminders,
  //   weekReminders,
  //   futureReminders,
  // };
  // // console.log(applications);
  // // page.tsx
  // console.log(result)
  return (
    <div className="flex flex-col p-4 sm:pt-10 md:px-8 lg:px-10 space-y-8 mb-auto">
      <div>
        <h1 className="text-3xl font-bold text-secondary-400 sm:text-4xl tracking-tight">
          Reminders
        </h1>
        <p className="text-muted-foreground">
          Stay on top of your job applications and deadlines. (Work In Progress)
        </p>
      </div>

      <ReminderSection title="Overdue" reminders={overdueReminders} />
      <ReminderSection title="This Week" reminders={weekReminders} />
      <ReminderSection title="Future" reminders={futureReminders} />
    </div>
  );
}
