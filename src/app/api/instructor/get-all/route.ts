import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const instructors = await prisma.instructor.findMany({});

  return NextResponse.json(instructors);
};
