import { axiosInstance } from "@/configs/axois-config";
import { SchemaReservation } from "@/types/schema-reservation";
import { Reservation } from "@prisma/client";

export const createReservation = async (data: SchemaReservation) => {
  const response = await axiosInstance.post<Reservation>(
    "reservation/create",
    data
  );

  return response.data;
};
