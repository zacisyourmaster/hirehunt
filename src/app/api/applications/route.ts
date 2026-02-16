import { prisma } from "@/lib/prisma";

import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Get all Applications
// export async function GET() {
//   return NextResponse.json({ message: "it worked" });
// }

//Create Application
export async function POST(req: Request) {
  const { userId } = await auth();
  console.log(userId);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log(body);
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

// {
//   company: 'ServiceNow',
//   position: 'Associate',
//   location: 'San Diego, CA',
//   salary: '$85,000',
//   status: 'applied',
//   jobType: 'fullTime',
//   notes: '',
//   appliedDate: '2026-02-16'
// }
