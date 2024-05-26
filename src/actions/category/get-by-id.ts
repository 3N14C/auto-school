import { axiosInstance } from "@/configs/axois-config";
import { Category } from "@prisma/client";

export const getCategoryById = async ({ id }: { id: string }) => {
  const response = await axiosInstance.get<Category>(`category/by-id?id=${id}`);

  return response.data;
};
