import { ApplicationWithReminders, statusStyles } from "@/types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar } from "lucide-react";
import { EditJobSheet } from "./EditJobSheet";
import { DeleteJobDialog } from "./DeleteJobDialog";
import { cn } from "@/lib/utils";

export function ApplicationCard({
  application,
}: {
  application: ApplicationWithReminders;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{application.position}</CardTitle>
        <CardDescription className="text-md">
          {application.company}
        </CardDescription>
        <CardAction>
          <Badge
            variant="outline"
            className={cn(
              "capitalize",
              `${application.status}`,
              statusStyles[application.status.toLowerCase()] ??
                "text-gray-300 bg-gray-950",
            )}
          >
            {application.status.toLowerCase()}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Applied:</span>
            <span>{application.appliedAt.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Salary:</span>
            <span>{application.salary ? application.salary : "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span>{application.location ? application.location : "N/A"}</span>
          </div>
        </div>
        {application.notes && (
          <p className="text-card-foreground">{application.notes}</p>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <div className="button-container flex space-x-2">
            <EditJobSheet application={application} />
            <DeleteJobDialog application={application} />
          </div>
          <span className="flex items-center gap-2 text-sm">
            <Calendar size={16} />
            Mar 21
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
