import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const instructorId = searchParams.get("id");

  const instructor = await prisma.instructor.delete({
    where: {
      id: instructorId as string,
    },
  });

  return NextResponse.json({
    instructor,
    message: "Instructor removed successfully",
  });
};
