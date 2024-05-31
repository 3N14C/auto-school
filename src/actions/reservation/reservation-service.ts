import { axiosInstance } from "@/configs/axois-config";
import { Reservation } from "@prisma/client";

export const ReservationService = {
  create: async ({
    instructorId,
    categoryId,
    userEmail,
  }: {
    instructorId: string;
    categoryId: string;
    userEmail: string;
  }) => {
    const response =
      await axiosInstance.post<Reservation>("reservation/create", {
        instructorId,
        categoryId,
        userEmail,
      });

    return response.data;
  },
};
