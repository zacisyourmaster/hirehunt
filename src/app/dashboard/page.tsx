// import { KanbanBoard } from "@/components/KanbanBoard";
// import Stats from "@/components/Stats";
import CreateJobDialog from "@/components/CreateJobDialog";
import EmptyState from "@/components/EmptyState";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
// import { ApplicationsTable } from "@/components/ApplicationsTable";
import { ApplicationsTable } from "./app-table";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Clock, FileText, Users } from "lucide-react";
import { StatCard } from "@/components/StatCard";


export default async function Dashboard() {
  const user = await currentUser();

  const applications = await prisma.application.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
  });

  const statusCounts = await prisma.application.groupBy({
    by: ["status"],
    where: { userId: user?.id },
    _count: {
      status: true,
    },
  });

  const stats = {
    total: 0,
    applied: 0,
    interview: 0,
  };

  statusCounts.forEach((row) => {
    stats.total += row._count.status;

    if (row.status === "APPLIED") {
      stats.applied = row._count.status;
    }

    if (row.status === "INTERVIEW") {
      stats.interview = row._count.status;
    }
  });

  const nonResponses = statusCounts
    .filter((row) => row.status === "APPLIED" || row.status === "GHOSTED")
    .reduce((sum, row) => sum + row._count.status, 0);

  const responded = stats.total - nonResponses;

  const responseRate =
    stats.total > 0 ? Math.round((responded / stats.total) * 100) : 0;

  const statCardData = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: <FileText />,
      iconBgClass: "bg-blue-950",
      iconTextClass: "text-blue-300",
    },
    {
      title: "Pending",
      value: stats.applied,
      icon: <Clock />,
      iconBgClass: "bg-yellow-950",
      iconTextClass: "text-yellow-300",
    },
    {
      title: "Interviews",
      value: stats.interview,
      icon: <Users />,
      iconBgClass: "bg-green-950",
      iconTextClass: "text-green-300",
    },
    {
      title: "Response Rate",
      value: `${responseRate}%`,
      icon: <BarChart3 />,
      iconBgClass: "bg-purple-950",
      iconTextClass: "text-purple-300",
    },
  ];
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">
            {user?.firstName
              ? `Welcome back, ${user.firstName}!`
              : "Welcome back!"}
          </h1>
          <p className="text-muted-foreground">Track your job search journey</p>
        </div>

        {applications.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {statCardData.map((data) => (
              <StatCard key={data.title} {...data} />
            ))}
          </div>
        )}

        <h2 className="text-2xl font-semibold">Your Applications</h2>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-muted-foreground">{`${applications.length} Total Jobs`}</h3>
          <div className="ml-auto">
            <CreateJobDialog />
          </div>
        </div>
        <Separator />

        {applications.length > 0 ? (
          <ApplicationsTable applications={applications} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
