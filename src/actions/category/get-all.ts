import { axiosInstance } from "@/configs/axois-config";
import { Category } from "@prisma/client";

export const getAllCategories = async () => {
  const response = await axiosInstance.get<Category[]>("category/get-all");

  return response.data;
};
