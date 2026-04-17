// import { KanbanBoard } from "@/components/KanbanBoard";
// import Stats from "@/components/Stats";
import CreateJobDialog from "@/components/CreateJobDialog";
import EmptyState from "@/components/EmptyState";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Separator } from "@/components/ui/separator";
import { ImportCSVDialog } from "@/components/ImportCSVDialog";
import { Suspense } from "react";
import { SkeletonTable } from "@/components/SkeletonTable";
import { computeStats } from "@/lib/dashboard";
// import ApplicationsTableWrapper from "./ApplicationsTableWrapper";
import { DashboardHeader } from "./DashboardHeader";
import { StatsGrid } from "./StatsGrid";
import ExportCSVButtonWrapper from "./ExportCSVButtonWrapper";
// import { ApplicationCard } from "@/components/ApplicationCard";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { List, Table } from "lucide-react";
// import { ApplicationCardsWrapper } from "@/components/ApplicationCardsWrapper";
// import ApplicationsWrapper from "./ApplicationsWrapper";
// import { ApplicationsTable } from "./app-table";
import { ApplicationTabs } from "./ApplicationTabs";

export default async function Dashboard() {
  const user = await currentUser();

  const statusCounts = await prisma.application.groupBy({
    by: ["status"],
    where: { userId: user?.id },
    _count: { status: true },
  });
  const stats = computeStats(statusCounts);
  // const mockApp = {
  //   id: "123u",
  //   userId: "string",
  //   company: "Trader Joe\'s",
  //   position: "Crew Member",
  //   status: "OFFER",
  //   notes: "They asked me what my favorite item was and I said apple fritter",
  //   salary: "$40,000",
  //   location: "San Diego",
  //   jobType: "FULL_TIME",
  //   appliedAt: new Date(),
  //   userEmail: "zac15590@gmail.com",
  //   createdAt: new Date(),
  // };

  const applications = await prisma.application.findMany({
    where: { userId: user?.id },
    include: { reminders: true },
    orderBy: { appliedAt: "desc" },
  });
  return (
    <div className="container md:max-w-5/6 mx-auto pt-8 mb-auto px-8 md:px-0">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <DashboardHeader user={user} />

        <StatsGrid stats={stats} />

        <h2 className="text-2xl font-semibold">Your Applications</h2>
        <Suspense fallback={<SkeletonTable />}>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-muted-foreground">{`${stats.total} Total Jobs`}</h3>
            <div className="ml-auto">
              <div className="flex gap-2">
                <ExportCSVButtonWrapper userId={user?.id} />
                <ImportCSVDialog />
                <CreateJobDialog />
              </div>
            </div>
          </div>
          <Separator />
          {stats.total > 0 ? (
            <ApplicationTabs applications={applications} />
          ) : (
            <EmptyState />
          )}
        </Suspense>
      </div>
    </div>
  );
}
