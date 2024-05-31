import { axiosInstance } from "@/configs/axois-config";
import { Car } from "@prisma/client";

export const CarService = {
  getAll: async () => {
    const resposne = await axiosInstance.get<Car[]>("car/get-all");

    return resposne.data;
  },
};
