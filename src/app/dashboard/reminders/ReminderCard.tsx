import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reminder } from "@/types";

export function ReminderCard({ reminder }: { reminder: Reminder }) {
  return (
    <Card className="w-full transition hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          {reminder.company} — {reminder.role}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            {reminder.type}
          </p>
          <p className="text-sm">
            <span className="font-medium">Due:</span> {reminder.dueDate}
          </p>
        </div>

        <Button size="sm" variant="secondary">
          Mark Complete
        </Button>
      </CardContent>
    </Card>
  );
}