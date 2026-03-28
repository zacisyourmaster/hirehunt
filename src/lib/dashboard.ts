import { ApplicationStatus } from "@/generated/prisma/enums";

type StatusCount = {
  status: ApplicationStatus;
  _count: {
    status: number;
  };
};
export function computeStats(statusCounts: StatusCount[]) {
  const stats = {
    total: 0,
    applied: 0,
    interview: 0,
  };

  statusCounts.forEach((row) => {
    stats.total += row._count.status;

    if (row.status === "APPLIED") stats.applied = row._count.status;
    if (row.status === "INTERVIEW") stats.interview = row._count.status;
  });

  const nonResponses = statusCounts
    .filter((row) => row.status === "APPLIED" || row.status === "GHOSTED")
    .reduce((sum, row) => sum + row._count.status, 0);

  const responded = stats.total - nonResponses;

  const responseRate =
    stats.total > 0 ? Math.round((responded / stats.total) * 100) : 0;

  return { ...stats, responseRate };
}
