import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const data: Category = await req.json();
  const categoryId = req.nextUrl.searchParams.get("id");

  const category = await prisma.category.update({
    where: {
      id: categoryId as string,
    },
    data: {
      ...data,
    },
  });

  return NextResponse.json({
    category,
    message: "Category updated successfully",
  });
};
