import type { User } from "@clerk/backend";
interface DashboardHeaderProps {
  user: User | null;
}
export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-3xl font-bold">
        {user?.firstName ? `Welcome back, ${user.firstName}!` : "Welcome back!"}
      </h1>
      <p className="text-muted-foreground">Track your job search journey</p>
    </div>
  );
}
