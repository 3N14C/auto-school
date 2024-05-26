"use server";

import { axiosInstance } from "@/configs/axois-config";
import { signInSchema } from "@/validators/form-signin-validator";
import { z } from "zod";
import { cookies } from "next/headers";
import { lucia } from "@/auth";
import prisma from "@/lib/prisma";

export const signIn = async (data: z.infer<typeof signInSchema>) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      phone: data.phone,
      password: data.password,
    },
  });

  if (!existingUser) {
    return {
      error: "Пользователь не существует",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};
