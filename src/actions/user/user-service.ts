import { axiosInstance } from "@/configs/axois-config";
import { UserByEmail, UserReservation } from "@/types/user-types";
import { User } from "@prisma/client";

export const UserService = {
  getByEmail: async ({ email }: { email: string }) => {
    const response = await axiosInstance.get<UserByEmail>("user/get-by-email", {
      params: { email },
    });

    return response.data;
  },

  getReservation: async ({ id }: { id: string }) => {
    const response = await axiosInstance.get<UserReservation>(
      "user/get-reservation/by-user-id",
      {
        params: { id },
      }
    );

    return response.data;
  },

  getById: async ({ id }: { id: string }) => {
    const response = await axiosInstance.get<User>(`user/get-by-id`, {
      params: { id },
    });

    return response.data;
  },
};
