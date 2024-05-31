import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data: { date: Date; time: string; reservationId: string } =
    await req.json();

  const lesson = await prisma.lesson.create({
    data: {
      ...data,
    },
  });

  return NextResponse.json(lesson);
};
