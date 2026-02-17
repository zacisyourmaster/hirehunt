"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ApplicationStatus, JobType } from "@/generated/prisma/enums";
//   id: string;
//   userId: string;
//   company: string;
//   position: string;
//   status: string;
//   notes: string | null;
//   salary: string | null;
//   location: string | null;
//   jobType: string | null;
//   appliedAt: Date;
//   followUpAt: Date | null;
//   createdAt: Date;
// }
// enum ApplicationStatus {
//   APPLIED,
//   INTERVIEW,
//   OFFER,
//   REJECTED,
//   GHOSTED
// }

// enum JobType {
//   INTERNSHIP,
//   FULL_TIME,
//   PART_TIME
// }
function parseMMDDYYYY(value: string): Date | undefined {
  const parts = value.split("-");
  if (parts.length !== 3) return undefined;

  const [month, day, year] = parts.map(Number);

  if (!month || !day || !year) return undefined;

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined;
  }

  return date;
}
export async function updateApplicationForm(formData: FormData) {
  const id = formData.get("id") as string;
  const company = formData.get("company") as string;
  const position = formData.get("position") as string;
  const status = formData.get("status") as ApplicationStatus;
  const notes = formData.get("notes") as string;
  const salary = formData.get("salary") as string;
  const location = formData.get("location") as string;
  const jobType = formData.get("jobType") as JobType;
  const rawAppliedAt = formData.get("appliedAt") as string;
  const rawFollowUpAt = formData.get("followUpAt") as string;
  const appliedAt = parseMMDDYYYY(rawAppliedAt);
  const followUpAt = parseMMDDYYYY(rawFollowUpAt);

  try {
    const updateUser = await prisma.application.update({
      where: {
        id,
      },
      data: {
        company,
        position,
        status,
        notes,
        salary,
        location,
        jobType,
        appliedAt,
        followUpAt,
      },
    });
    revalidatePath("/dashboard");
  } catch (err) {
    console.error(err);
  }
}
export async function deleteApplication(id: string) {
  try {
    await prisma.application.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard");
  } catch (err) {
    console.error(err);
  }
}
