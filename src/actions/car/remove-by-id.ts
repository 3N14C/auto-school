import { axiosInstance } from "@/configs/axois-config";

export const removeCarById = async ({ id }: { id: string }) => {
  const response = await axiosInstance.delete(`car/remove/by-id?id=${id}`);

  return response.data;
};
