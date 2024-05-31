import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const users = await prisma.user.findMany({
    where: {
      role: {
        not: "ADMIN",
      },
    },

    include: {
      application: true,
      instructor: true,
      reservation: true,
    },
  });

  return NextResponse.json(users);
};
