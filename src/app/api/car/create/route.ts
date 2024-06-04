import prisma from "@/lib/prisma";
import { formAddCar } from "@/validators/form-add-car";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const data: z.infer<typeof formAddCar> = await req.json();

  const car = await prisma.car.create({
    data: {
      ...data,
    },
  });

  return NextResponse.json({
    car,
    message: "Car created successfully",
  });
};
