import validator from "validator";
import { z } from "zod";

export const signInSchema = z.object({
  phone: z.string({required_error: "Поле обязательно для заполнения"}).min(11, "Неверный номер телефона"),

  password: z.string().min(6, "Минимальная длина пароля 6 символов"),
});
