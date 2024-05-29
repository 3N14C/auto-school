import { axiosInstance } from "@/configs/axois-config";
import { Application } from "@prisma/client";

export const getAllApplications = async () => {
  const response = await axiosInstance.get<Application[]>(
    "application/get-all"
  );

  return response.data;
};
