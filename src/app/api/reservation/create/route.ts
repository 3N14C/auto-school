import prisma from "@/lib/prisma";
import { SchemaReservation } from "@/types/schema-reservation";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data: SchemaReservation = await req.json();

  const existingReservation = await prisma.reservation.findUnique({
    where: {
      userId: data.userId,
    },
  });

  if (existingReservation) {
    throw new Error("Reservation already exists");
  }

  const reservation = await prisma.reservation.create({
    data: {
      userId: data.userId,
      categoryId: data.categoryId,
      reservationDate: data.dateTime,
    },
  });

  return NextResponse.json(reservation);
};
