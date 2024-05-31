import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const reservationId = searchParams.get("id");

  const reservation = await prisma.reservation.delete({
    where: {
      id: reservationId as string,
    },
  });

  return NextResponse.json(reservation);
};
