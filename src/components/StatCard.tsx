import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgClass?: string;
  iconTextClass?: string;
}

export function StatCard({
  title,
  value,
  icon,
  iconBgClass,
  iconTextClass,
}: StatCardProps) {
  return (
    <Card className="@container/card mx-auto w-full max-w-sm shadow-accent">
      <CardContent>
        <div className="flex items-center">
          <div className={cn("p-3 rounded-lg", iconBgClass ?? "bg-muted")}>
            <div className={cn("h-6 w-6", iconTextClass)}>{icon}</div>
          </div>

          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
