import { axiosInstance } from "@/configs/axois-config";
import { Car } from "@prisma/client";

export const getCarById = async ({ id }: { id: string }) => {
  const response = await axiosInstance.get<Car>(`car/by-id?id=${id}`);

  return response.data;
};
