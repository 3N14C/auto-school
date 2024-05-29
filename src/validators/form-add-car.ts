import { z } from "zod";

export const formAddCar = z.object({
  brand: z.string().min(1, "Поле обязательно для заполнения"),
  model: z.string().min(1, "Поле обязательно для заполнения"),
});
