import validator from "validator";
import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Поле обязательно для заполнения")
    .regex(/^[а-яА-Я]+$/, "Неверное имя"),
  phoneNumber: z
    .string()
    .refine(
      validator.isMobilePhone,
      "Неверный номер телефона или номер должен начинаться с +7"
    ),
  password: z.string().min(6, "Минимальная длина пароля 6 символов"),
});
