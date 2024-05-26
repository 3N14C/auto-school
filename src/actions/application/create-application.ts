import { axiosInstance } from "@/configs/axois-config";
import { schema } from "@/validators/form-event-validator";
import { Application } from "@prisma/client";
import { z } from "zod";

export const createApplication = async (data: z.infer<typeof schema>) => {
  const response = await axiosInstance.post<Application>(
    `application/create`,
    data
  );

  return response.data;
};
