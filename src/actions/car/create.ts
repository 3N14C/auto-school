import { axiosInstance } from "@/configs/axois-config";
import { formAddCar } from "@/validators/form-add-car";
import { z } from "zod";

export const createCar = async (data: z.infer<typeof formAddCar>) => {
  const response = await axiosInstance.post("car/create", data, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });

  return response.data;
};
