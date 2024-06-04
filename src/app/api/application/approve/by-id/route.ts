import prisma from "@/lib/prisma";
import { ApplicationStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const PATCH = async (req: NextRequest) => {
  const data: { password: string } = await req.json();
  const { searchParams } = req.nextUrl;
  const applicationId = searchParams.get("id");

  const application = await prisma.application.update({
    where: {
      id: applicationId as string,
    },
    data: {
      applicationStatus: "APPROVED",
    },
  });

  if (!application) throw new Error("Application not found");

  const user = await prisma.user.create({
    data: {
      name: application.name,
      phone: application.phone,
      email: application.email,
      password: data.password,
    },
  });

  const connectApplicationToUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      applicationId: application.id,
    },
  });

  return NextResponse.json({
    connectApplicationToUser,
    message: "Application approved successfully",
  });
};
