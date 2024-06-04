import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const carId = searchParams.get("id");

  const car = await prisma.car.delete({
    where: {
      id: carId as string,
    },
  });

  return NextResponse.json({
    car,
    message: "Car removed successfully",
  });
};
