// import { KanbanBoard } from "@/components/KanbanBoard";
import Stats from "@/components/Stats";
import CreateJobDialog from "@/components/CreateJobDialog";
import EmptyState from "@/components/EmptyState";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { ApplicationsTable } from "@/components/ApplicationsTable";
import { Separator } from "@/components/ui/separator";
// import { getCachedUser } from '@/lib/auth';

export default async function Dashboard() {
  const user = await currentUser();

  const applications = await prisma.application.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
  });

  // return (
  //   <div className="container mx-auto w-full py-8">
  //     {/* <div className="container mx-auto px-4 py-8"> */}
  //     <div className="container max-w-6xl">
  //       <div className="mb-8">
  //         <h1 className="text-3xl font-bold">{`Welcome Back${user?.firstName ? `, ${user.firstName}` : ""}`}</h1>
  //         <p className="text-muted-foreground">Track your job applications</p>
  //       </div>
  //       <div className="flex flex-col items-start space-y-3">
  //         <Stats />
  //         <Separator className="my-4 bg-border" decorative />
  //         <CreateJobDialog />
  //         <div className="h-full w-full m-auto">
  //           {applications.length > 0 ? (
  //             <ApplicationsTable applications={applications} />
  //           ) : (
  //             <EmptyState />
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4">
        {/* Headers will naturally be left-aligned in flex col */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">
            {user?.firstName
              ? `Welcome back, ${user.firstName}!`
              : "Welcome back!"}
          </h1>
          <p className="text-muted-foreground">Track your job search journey</p>
        </div>

        <Stats />

        <Separator />

        <h2 className="text-2xl font-semibold">Your Applications</h2>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-muted-foreground">{`${applications.length} Total Jobs`}</h3>
          <div className="ml-auto">
          <CreateJobDialog />
          </div>
        </div>

        {applications.length > 0 ? (
          <ApplicationsTable applications={applications} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
