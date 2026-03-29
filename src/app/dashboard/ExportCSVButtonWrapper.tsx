import { prisma } from "@/lib/prisma";
import ExportCSVButton from "./ExportCSVButton";

export default async function ExportCSVButtonWrapper({
  userId,
}: {
  userId: string | undefined;
}) {
  const applications = await prisma.application.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  return <ExportCSVButton applications={applications} />;
}
