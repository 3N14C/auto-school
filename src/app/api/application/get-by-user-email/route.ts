import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const applicationId = searchParams.get("id");

  const application = await prisma.application.findUnique({
    where: {
      id: applicationId as string,
    },
  });

  return NextResponse.json(application);
};
