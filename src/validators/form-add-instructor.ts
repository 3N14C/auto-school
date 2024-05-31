import { z } from "zod";

export const formAddInstructor = z.object({
    firstName: z.string().min(1, "Поле обязательно для заполнения"),
    lastName: z.string().min(1, "Поле обязательно для заполнения"),
    img: z.string().optional(),
})