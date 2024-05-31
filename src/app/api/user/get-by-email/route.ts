import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const userEmail = searchParams.get("email");

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail as string,
    },

    include: {
      instructor: true,
    },
  });

  return NextResponse.json(user);
};
