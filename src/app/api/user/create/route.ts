import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const data: User = await req.json();

  const user = await prisma.user.create({
    data: {
      ...data,
    },
  });

  return NextResponse.json({
    user,
    message: "User created successfully",
  });
};
