"use server";

import { axiosInstance } from "@/configs/axois-config";
import { signUpSchema } from "@/validators/form-signup-validator";
import { z } from "zod";
import { cookies } from "next/headers";
import { lucia } from "@/auth";
import prisma from "@/lib/prisma";

export const signUp = async (data: z.infer<typeof signUpSchema>) => {
  const user = await prisma.user.create({
    data: {
      phone: data.phoneNumber,
      name: data.name,
      password: data.password,
    },
  });

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};
