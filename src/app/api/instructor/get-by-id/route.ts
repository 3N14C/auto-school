import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const instructorId = searchParams.get("id");

  const instructor = await prisma.instructor.findUnique({
    where: {
      id: instructorId as string,
    },
  });

  return NextResponse.json(instructor);
};
