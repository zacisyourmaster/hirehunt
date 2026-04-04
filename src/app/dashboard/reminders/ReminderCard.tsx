// ReminderCard.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reminder } from "@/generated/prisma/browser";

interface ReminderWithApp extends Reminder {
  application?: {
    company: string;
    position: string;
  };
}

export function ReminderCard({ reminder }: { reminder: ReminderWithApp }) {
  return (
    <Card className="w-full transition hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          {reminder.application?.company || "Unknown Company"} —{" "}
          {reminder.application?.position || "Unknown Position"}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{reminder.type}</p>
          <p className="text-sm">
            <span className="font-medium">Due:</span>{" "}
            {new Date(reminder.dueDate).toDateString()}
          </p>
          {reminder.notes && (
            <p className="text-sm text-muted-foreground">{reminder.notes}</p>
          )}
        </div>

        <Button size="sm" variant="secondary">
          Mark Complete
        </Button>
      </CardContent>
    </Card>
  );
}
