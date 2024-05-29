import { axiosInstance } from "@/configs/axois-config";
import { formAddCar } from "@/validators/form-add-car";
import { z } from "zod";

export const createCar = async (data: z.infer<typeof formAddCar>) => {
  const response = await axiosInstance.post("car/create", data);

  return response.data;
};
