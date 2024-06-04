import { axiosInstance } from "@/configs/axois-config";
import { Car } from "@prisma/client";

export const getAllCars = async () => {
  const resposne = await axiosInstance.get<Car[]>("car/get-all", {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });

  return resposne.data;
};
