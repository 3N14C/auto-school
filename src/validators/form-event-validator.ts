import { z } from "zod";
import validator from "validator";

export const schema = z.object({
  email: z.string().email("Неверная почта"),
  name: z
    .string()
    .min(1, "Поле обязательно для заполнения")
    .regex(/^[а-яА-Я\s]+$/, "Неверное имя"),
  phoneNumber: z
    .string({required_error: "Поле обязательно для заполнения"})
});
