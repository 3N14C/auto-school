"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { signInSchema } from "@/validators/form-signin-validator";
import { cookies } from "next/headers";
import { z } from "zod";

export const signIn = async (data: z.infer<typeof signInSchema>) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      phone: data.phone,
      password: data.password,
    },
  });

  if (!existingUser) {
    throw new Error("Неверные данные");
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};
