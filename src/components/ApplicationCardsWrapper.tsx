import { ApplicationCard } from "./ApplicationCard";
import { prisma } from "@/lib/prisma";

export async function ApplicationCardsWrapper({
  userId,
}: {
  userId: string | undefined;
}) {
  const applicationList = await prisma.application.findMany({
    where: { userId },
    include: { reminders: true }, // add this
    orderBy: { appliedAt: "desc" },
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {applicationList.map((app) => {
        return <ApplicationCard key={app.id} application={app} />;
      })}
    </div>
  );
}
