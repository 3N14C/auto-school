import prisma from "@/lib/prisma";
import { SchemaReservation } from "@/types/schema-reservation";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data: SchemaReservation = await req.json();

  const reservation = await prisma.reservation.create({
    data: {
      user: {
        connect: {
          id: data.userId,
        },
      },
      categoryId: data.categoryId,
      reservationDate: data.dateTime,
    },
  });

  return NextResponse.json(reservation);
};
