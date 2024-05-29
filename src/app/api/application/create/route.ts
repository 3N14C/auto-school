import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { schema } from "@/validators/form-event-validator";

export const POST = async (req: NextRequest) => {
  const data: z.infer<typeof schema> = await req.json();

  const application = await prisma.application.create({
    data: {
      name: data.name,
      phone: data.phoneNumber,
      email: data.email,
    },
  });

  return NextResponse.json(application);
};
