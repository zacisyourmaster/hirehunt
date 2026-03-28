import { Card } from "@/components/ui/card";
import { Reminder } from "@/types";
// import { ReminderCard } from "./ReminderCard";

export function ReminderSection({
  title,
  reminders,
}: {
  title: string;
  reminders: Reminder[];
}) {
  if (reminders.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">
        {title} ({reminders.length})
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* {reminders.map((reminder) => (
          <ReminderCard key={reminder.id} reminder={reminder} />
        ))} */}
        <Card>Coming Soon...</Card>
      </div>
    </div>
  );
}
