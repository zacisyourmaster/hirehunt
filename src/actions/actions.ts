"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  ApplicationStatus,
  JobType,
  ReminderType,
} from "@/generated/prisma/enums";
import { currentUser } from "@clerk/nextjs/server";

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
  const appliedAt = parseMMDDYYYY(rawAppliedAt);

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

export async function bulkAddApplications(formData: FormData) {
  const file = formData.get("file") as File;
  const mappingRaw = formData.get("columnMapping") as string;
  const user = await currentUser();
  if (!user) return;
  if (!file) throw new Error("No file uploaded");
  if (!mappingRaw) throw new Error("No column mapping provided");

  const columnMapping: Partial<Record<string, string>> = JSON.parse(mappingRaw);

  try {
    const text = await file.text();
    const lines = text.split("\n").filter((line) => line.trim() !== "");

    const parseRow = (line: string): string[] =>
      line.split(",").map((cell) => cell.trim().replace(/^"|"$/g, ""));

    const headers = parseRow(lines[0]);
    const rows = lines
      .slice(1)
      .filter((l) => l.trim() !== "")
      .map(parseRow);

    // Helper: get cell value from a row by the user's CSV column name
    const get = (row: string[], expectedKey: string): string | undefined => {
      const csvHeader = columnMapping[expectedKey];
      if (!csvHeader) return undefined;
      const idx = headers.indexOf(csvHeader);
      return idx !== -1 ? row[idx] : undefined;
    };

    const data = rows.map((row) => {
      const appliedAtRaw = get(row, "appliedAt");
      const appliedAt = appliedAtRaw ? new Date(appliedAtRaw) : new Date();

      const statusRaw = get(row, "status")?.toUpperCase();
      const validStatuses = [
        "APPLIED",
        "INTERVIEW",
        "OFFER",
        "REJECTED",
        "GHOSTED",
        "OTHER",
        "WITHDRAWL",
      ];
      const status = validStatuses.includes(statusRaw ?? "")
        ? (statusRaw as ApplicationStatus)
        : ApplicationStatus.APPLIED;

      const jobTypeRaw = get(row, "jobType")?.toUpperCase();
      const validJobTypes = ["FULL_TIME", "PART_TIME", "INTERNSHIP"];
      const jobType = validJobTypes.includes(jobTypeRaw ?? "")
        ? (jobTypeRaw as JobType)
        : undefined;

      return {
        userId: user?.id,
        company: get(row, "company") ?? "",
        position: get(row, "position") ?? "",
        status,
        notes: get(row, "notes") ?? null,
        salary: get(row, "salary") ?? null,
        location: get(row, "location") ?? null,
        jobType: jobType ?? null,
        appliedAt: isNaN(appliedAt.getTime()) ? new Date() : appliedAt,
      };
    });

    // Drop rows missing required fields
    const validData = data.filter((d) => d.company && d.position);

    await prisma.application.createMany({ data: validData });
    revalidatePath("/dashboard");
    return { success: true, inserted: validData.length };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to import applications");
  }
}

export async function createReminder(formData: FormData) {
  const applicationId = formData.get("applicationId") as string;
  const type = formData.get("type") as ReminderType;
  const rawDueDate = formData.get("dueDate") as string;
  const notes = formData.get("notes") as string;
  const dueDate = new Date(rawDueDate);

  try {
    const newReminder = await prisma.reminder.create({
      data: {
        applicationId,
        type,
        dueDate,
        notes,
      },
    });
    revalidatePath(`/dashboard?id=${applicationId}`);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to add reminder");
  }
}

export async function completeReminder(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.reminder.update({
    where: { id },
    data: { completed: true },
  });

}

export async function deleteReminder(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.reminder.delete({
    where: { id },
  });
}
