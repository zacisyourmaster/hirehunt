import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      reminders: {
        where: { completed: false },
        orderBy: { dueDate: "asc" },
      },
    },
  });

  return NextResponse.json(application);
}
