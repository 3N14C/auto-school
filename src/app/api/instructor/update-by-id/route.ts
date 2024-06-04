import prisma from "@/lib/prisma";
import { formUpdateInstructor } from "@/validators/form-update-instructor";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

export const PATCH = async (req: NextRequest) => {
  const data: z.infer<typeof formUpdateInstructor> = await req.json();
  const { searchParams } = req.nextUrl;
  const instructorId = searchParams.get("id");

  const instructor = await prisma.instructor.update({
    where: {
      id: instructorId as string,
    },
    data: {
      ...data,
    },
  });

  return NextResponse.json({
    instructor,
    message: "Instructor updated successfully",
  });
};
