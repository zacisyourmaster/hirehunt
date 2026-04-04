// ReminderSection.tsx
import { Reminder } from "@/generated/prisma/browser";
import { ReminderCard } from "./ReminderCard";
import { Application } from "@/types";

export function ReminderSection({
  title,
  reminders,
}: {
  title: string;
  reminders: (Reminder & { application?: Application })[];
}) {
  if (reminders.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">
        {title} ({reminders.length})
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reminders.map((reminder) => (
          <ReminderCard key={reminder.id} reminder={reminder} />
        ))}
      </div>
    </div>
  );
}