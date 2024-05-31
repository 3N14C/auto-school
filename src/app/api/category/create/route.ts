import prisma from "@/lib/prisma";
import { formAddCategory } from "@/validators/form-add-category";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
    const data: z.infer<typeof formAddCategory> = await req.json();

    const category = await prisma.category.create({
        data: {
            ...data,
        },
    });

    return NextResponse.json(category);
}