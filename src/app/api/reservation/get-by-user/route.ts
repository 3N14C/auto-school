import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("id");

  const reservations = await prisma.reservation.findMany({
    where: {
      
    },
  });
};
