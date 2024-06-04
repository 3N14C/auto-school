import { axiosInstance } from "@/configs/axois-config";
import { formAddInstructor } from "@/validators/form-add-instructor";
import { formUpdateInstructor } from "@/validators/form-update-instructor";
import { Instructor } from "@prisma/client";
import { z } from "zod";

export const InstructorService = {
  create: async (
    data: z.infer<typeof formAddInstructor> & { carId: string }
  ) => {
    const response = await axiosInstance.post("instructor/create", data, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    return response;
  },

  getAll: async () => {
    const response = await axiosInstance.get<Instructor[]>(
      "instructor/get-all",
      {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );

    return response.data;
  },

  getById: async ({ id }: { id: string }) => {
    const response = await axiosInstance.get<Instructor>(
      `instructor/get-by-id`,
      {
        params: { id },
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );

    return response.data;
  },

  updateById: async (
    data: z.infer<typeof formUpdateInstructor> & { id: string }
  ) => {
    const response = await axiosInstance.patch<Instructor>(
      `instructor/update-by-id`,
      data,
      {
        params: { id: data.id },
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );

    return response.data;
  },

  removeById: async ({ id }: { id: string }) => {
    const response = await axiosInstance.delete(`instructor/remove-by-id`, {
      params: { id },
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    return response.data;
  },
};
