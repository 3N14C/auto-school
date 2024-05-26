import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const categoryId = searchParams.get("id");

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId as string,
    },
  });

  return NextResponse.json(category);
};
