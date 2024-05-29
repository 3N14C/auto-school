import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const applications = await prisma.application.findMany({});

  return NextResponse.json(applications);
};
