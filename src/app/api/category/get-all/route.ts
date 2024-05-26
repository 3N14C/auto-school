import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  const categories = await prisma.category.findMany({});

  return NextResponse.json(categories);
};
