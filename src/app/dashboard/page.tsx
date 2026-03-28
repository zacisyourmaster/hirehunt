// import { KanbanBoard } from "@/components/KanbanBoard";
// import Stats from "@/components/Stats";
import CreateJobDialog from "@/components/CreateJobDialog";
import EmptyState from "@/components/EmptyState";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Separator } from "@/components/ui/separator";
import { ImportCSVDialog } from "@/components/ImportCSVDialog";
import ExportCSVButton from "./ExportCSVButton";
import { Suspense } from "react";
import { SkeletonTable } from "@/components/SkeletonTable";
import { computeStats } from "@/lib/dashboard";
import ApplicationsTableWrapper from "./ApplicationsTableWrapper";
import { DashboardHeader } from "./DashboardHeader";
import { StatsGrid } from "./StatsGrid";

export default async function Dashboard() {
  const user = await currentUser();

  const [applications, statusCounts] = await Promise.all([
    prisma.application.findMany({
      where: { userId: user?.id },
      orderBy: { createdAt: "desc" },
      // include: { reminders: true },
    }),
    prisma.application.groupBy({
      by: ["status"],
      where: { userId: user?.id },
      _count: { status: true },
    }),
  ]);

  const stats = computeStats(statusCounts);

  return (
    <div className="container md:max-w-5/6 mx-auto pt-8 mb-auto px-8 md:px-0">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <DashboardHeader user={user} />

        {applications.length > 0 && <StatsGrid stats={stats} />}

        <h2 className="text-2xl font-semibold">Your Applications</h2>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-muted-foreground">{`${applications.length} Total Jobs`}</h3>
          <div className="ml-auto">
            <div className="flex gap-2">
              <ExportCSVButton applications={applications} />
              <ImportCSVDialog />
              <CreateJobDialog />
            </div>
          </div>
        </div>
        <Separator />
        <Suspense fallback={<SkeletonTable />}>
          {applications.length > 0 ? (
            <ApplicationsTableWrapper userId={user?.id} />
          ) : (
            <EmptyState />
          )}
        </Suspense>
      </div>
    </div>
  );
}
