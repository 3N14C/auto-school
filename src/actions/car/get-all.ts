import { axiosInstance } from "@/configs/axois-config";
import { baseUrl } from "@/configs/fetch-config";
import { Car } from "@prisma/client";

export const getAllCars = async () => {
  const resposne = await fetch(`${baseUrl}/car/get-all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 0,
    },
    cache: "no-store",
  });

  return resposne.json() as Promise<Car[]>;
};
