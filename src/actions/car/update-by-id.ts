import { axiosInstance } from "@/configs/axois-config";
import { formCarModalSchema } from "@/validators/form-car-modal";
import { Car } from "@prisma/client";
import { z } from "zod";

export const updateCarById = async (
  carId: string,
  data: z.infer<typeof formCarModalSchema>
) => {
  const response = await axiosInstance.patch<Car>(
    `car/update/by-id?id=${carId}`,
    data
  );

  return response.data;
};
