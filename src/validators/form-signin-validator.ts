import validator from "validator";
import { z } from "zod";

export const signInSchema = z.object({
  phone: z
    .string()
    .refine(
      validator.isMobilePhone,
      "Неверный номер телефона или номер должен начинаться с +7"
    ),

  password: z.string().min(6, "Минимальная длина пароля 6 символов"),
});
