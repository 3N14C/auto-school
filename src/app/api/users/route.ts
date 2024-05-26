import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const users = prisma.user.findMany();

  return NextResponse.json(users);
};
