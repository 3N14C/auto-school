import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("id");

  const user = await prisma.user.delete({
    where: {
      id: userId as string,
    },
  });

  return NextResponse.json({
    user,
    message: "User deleted successfully",
  });
};
