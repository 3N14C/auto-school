import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("id");

  const user = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
  });

  return NextResponse.json(user);
};
