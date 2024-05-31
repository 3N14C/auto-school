import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const lessons = await prisma.lesson.findMany();
  return NextResponse.json(lessons);
};
