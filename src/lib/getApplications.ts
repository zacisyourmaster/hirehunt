import { prisma } from "@/lib/prisma";

export async function getApplications(userId: string | undefined) {
  if (!userId) return [];
  
  return await prisma.application.findMany({
    where: { userId },
    include: { reminders: true },
    orderBy: { appliedAt: "desc" },
  });
}