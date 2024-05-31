import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const lessonId = searchParams.get("lessonId");
  const userId = searchParams.get("userId");

  const lesson = await prisma.lesson.update({
    where: {
      id: lessonId as string,
    },

    data: {
      status: "COMPLETED",
    //   reservation: {
    //     disconnect: true,
    //   },
    },
  });

  await prisma.user.update({
    where: {
      id: userId as string,
    },

    data: {
      driveHours: 2,
    },
  });

  return NextResponse.json(lesson);
};
