import { axiosInstance } from "@/configs/axois-config";
import { ApplicationByUserEmail } from "@/types/application-types";

export const ApplicationService = {
  getByUserEmail: async ({ id }: { id: string }) => {
    const response = await axiosInstance.get<ApplicationByUserEmail>(
      "application/get-by-user-email",
      {
        params: {
          id,
        },
      }
    );

    return response.data;
  },
};
