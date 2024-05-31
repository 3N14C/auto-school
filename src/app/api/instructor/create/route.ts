import prisma from "@/lib/prisma";
import { formAddInstructor } from "@/validators/form-add-instructor";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  const data: z.infer<typeof formAddInstructor> & { carId: string } =
    await req.json();

  const instructor = await prisma.instructor.create({
    data: {
      ...data,
    },
  });

  return NextResponse.json({
    instructor,
    message: "Instructor created successfully",
  });
};
