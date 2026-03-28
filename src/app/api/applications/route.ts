/* eslint-disable prefer-const */
import { prisma } from "@/lib/prisma";

import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Create Application
export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await currentUser();

    const userEmail = user?.emailAddresses?.[0]?.emailAddress || null;

    const body = await req.json();

    let {
      company,
      position,
      status,
      notes,
      appliedAt,
      salary,
      location,
      jobType,
    } = body;

    if (!company || !position || !status || !appliedAt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    company = company.trim();
    position = position.trim();
    status = status.trim().toUpperCase();
    jobType = jobType?.trim().toUpperCase();

    const application = await prisma.application.create({
      data: {
        userId,
        userEmail,
        company,
        position,
        status,
        appliedAt: new Date(appliedAt),
        ...(notes && { notes: notes.trim() }),
        ...(salary && { salary: salary.trim() }),
        ...(location && { location: location.trim() }),
        ...(jobType && { jobType }),
      },
      omit: {
        userId: true,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (e) {
    console.error("Error: ", e);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 },
    );
  }
}
