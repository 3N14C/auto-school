import { axiosInstance } from "@/configs/axois-config";
import { User } from "@prisma/client";

export const approveApplicationById = async (data: {
  id: string;
  password: string;
}) => {
  const response = await axiosInstance.patch<
    User
  >(`application/approve/by-id?id=${data.id}`, data);

  return response.data;
};
