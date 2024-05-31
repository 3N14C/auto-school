import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const lessonId = searchParams.get("id");

  const lesson = await prisma.lesson.delete({
    where: {
      id: lessonId as string,
    },
  });

  return NextResponse.json(lesson);
};
