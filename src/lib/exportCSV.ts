import { Application } from "@/types";
import { json2csv } from "json-2-csv";

export async function exportAllApplications(applications: Application[]) {
  try {
    const parsedApplications = applications.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ id, userId, createdAt, appliedAt, followUpAt, ...rest }) => ({
        appliedAt: appliedAt ? new Date(appliedAt).toLocaleDateString() : "",
        ...rest,
        followUpAt: followUpAt ? new Date(followUpAt).toLocaleDateString() : "",
      }),
    );
    const csvData = await json2csv(parsedApplications, {
      keys: [
        { field: "appliedAt", title: "Applied Date" },
        { field: "company", title: "Company" },
        { field: "position", title: "Position" },
        { field: "status", title: "Status" },
        { field: "location", title: "Location" },
        { field: "jobType", title: "Job Type" },
        { field: "salary", title: "Salary" },
        { field: "followUpAt", title: "Follow Up Date" },
        { field: "notes", title: "Notes" },
      ],
    });
    const blob = new Blob(["\uFEFF" + csvData], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "applications.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    throw new Error("Something Went Wrong");
  }
}