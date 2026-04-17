// components/ApplicationsWrapper.tsx
import { getApplications } from "@/lib/getApplications";
import { ApplicationsTable } from "./app-table";
import { ApplicationCard } from "./ApplicationCard";

export default async function ApplicationsWrapper({
  userId,
  viewMode = "table",
}: {
  userId: string | undefined;
  viewMode?: "table" | "cards";
}) {
  const applications = await getApplications(userId);

  if (viewMode === "cards") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {applications.map((app) => (
          <ApplicationCard key={app.id} application={app} />
        ))}
      </div>
    );
  }

  return <ApplicationsTable applications={applications} />;
}