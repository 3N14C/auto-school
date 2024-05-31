import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const reservations = await prisma.reservation.findMany({
    include: {
      lessons: true,
    },
  });
  return NextResponse.json(reservations);
};
