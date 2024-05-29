import prisma from "@/lib/prisma";
import { formCarModalSchema } from "@/validators/form-car-modal";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const PATCH = async (req: NextRequest) => {
  const data: z.infer<typeof formCarModalSchema> = await req.json();
  const { searchParams } = req.nextUrl;
  const carId = searchParams.get("id");

  const car = await prisma.car.update({
    where: {
      id: carId as string,
    },

    data: {
      ...data,
    },
  });

  return NextResponse.json({
    car,
    message: "Car updated successfully",
  });
};
