import { axiosInstance } from "@/configs/axois-config";
import { Lesson } from "@prisma/client";

export const LessonService = {
  create: async (data: { date: Date; time: string; reservationId: string }) => {
    const response = await axiosInstance.post<Lesson>("lesson/create", data);

    return response.data;
  },

  updateStatus: async (data: { lessonId: string; userId: string }) => {
    const response = await axiosInstance.patch<Lesson>(
      "lesson/update-status",
      {},
      {
        params: { lessonId: data.lessonId, userId: data.userId },
      }
    );

    return response.data;
  },
};
