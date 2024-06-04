import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("id");
  const data: User = await req.json();

  const user = await prisma.user.update({
    where: {
      id: userId as string,
    },

    data: {
      ...data,
    },
  });

  return NextResponse.json({
    user,
    message: "User updated successfully",
  });
};
