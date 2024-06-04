import { axiosInstance } from "@/configs/axois-config";
import { baseUrl } from "@/configs/fetch-config";
import { formAddCar } from "@/validators/form-add-car";
import { z } from "zod";

export const createCar = async (data: z.infer<typeof formAddCar>) => {
  const response = await fetch(`${baseUrl}/car/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 0,
    },
    cache: "no-store",
    body: JSON.stringify(data),
  });

  return response.json();
};
