import { axiosInstance } from "@/configs/axois-config";

export const approveApplicationById = async (data: {
  id: string;
  password: string;
}) => {
  const response = await axiosInstance.patch(
    `application/approve/by-id?id=${data.id}`,
    data
  );

  return response.data;
};
