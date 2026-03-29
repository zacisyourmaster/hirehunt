import { prisma } from "@/lib/prisma";
import { ApplicationsTable } from "./app-table";

interface ApplicationsTableWrapperProps {
  userId: string | undefined;
}
export default async function ApplicationsTableWrapper({
  userId,
}: ApplicationsTableWrapperProps) {
  const applications = await prisma.application.findMany({
    where: { userId },
    include: { reminders: true }, // add this
    orderBy: { appliedAt: "desc" },
  });

  return <ApplicationsTable applications={applications} />;
}
