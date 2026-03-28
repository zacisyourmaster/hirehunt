import { Button } from "@/components/ui/button";
import type { User } from "@clerk/backend";
import Link from "next/link";
interface DashboardHeaderProps {
  user: User | null;
}
export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">
          {user?.firstName
            ? `Welcome back, ${user.firstName}!`
            : "Welcome back!"}
        </h1>
        <Link href="/dashboard/reminders">
          <Button size="lg" className="cursor-pointer text-md tracking-tight">
            View Reminders
          </Button>
        </Link>
      </div>
      <p className="text-muted-foreground">Track your job search journey</p>
    </div>
  );
}
