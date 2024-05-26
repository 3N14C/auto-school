import { z } from "zod";
import validator from "validator";

const dateRegex = /^\d{2}\.\d{2}\.\d{2}$/;

export const schema = z.object({
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
  // date: z.preprocess((arg) => {
  //   if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  // }, z.date()),
});
