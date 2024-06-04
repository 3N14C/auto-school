import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const {
    instructorId,
    categoryId,
    userEmail,
  }: { instructorId: string; categoryId: string; userEmail: string } =
    await req.json();

  const reservation = await prisma.reservation.create({
    data: {
      instructorId,
      categoryId,
      user: {
        connect: {
          email: userEmail,
        },
      },
    },
  });

  if (!reservation) throw new Error("Reservation not created");
  await prisma.user.update({
    where: {
      email: userEmail,
    },
    data: {
      instructorId: reservation.instructorId,
    },
  });

  return NextResponse.json(reservation);
};
