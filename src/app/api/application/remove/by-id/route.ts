import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const ticketId = searchParams.get("id");

  const ticket = await prisma.application.delete({
    where: {
      id: ticketId as string,
    },
  });

  return NextResponse.json({
    ticket,
    message: "Successfully deleted ticket",
  });
};
