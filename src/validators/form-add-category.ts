import { z } from "zod";

export const formAddCategory = z.object({
  name: z.string().min(1, "Поле обязательно для заполнения"),
});
