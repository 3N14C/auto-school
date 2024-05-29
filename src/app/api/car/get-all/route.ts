import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const cars = await prisma.car.findMany({});

  return NextResponse.json(cars);
};
