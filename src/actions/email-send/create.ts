import { axiosInstance } from "@/configs/axois-config";
import { User } from "@prisma/client";

export const sendToEmail = async (data: {
  email: string;
  password: string;
  phone: string;
}) => {
  const response = await axiosInstance.post("/send", JSON.stringify(data));

  return response.data;
};
