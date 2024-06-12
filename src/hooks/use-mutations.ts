"use client";

import { approveApplicationById } from "@/actions/application/approve";
import { sendToEmail } from "@/actions/email-send/create";
import { LessonService } from "@/actions/lesson/lesson-service";
import { ReservationService } from "@/actions/reservation/reservation-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface IProps {
  date?: Date;
  time?: string;
}

export const useMutations = ({ date, time }: IProps) => {
  const { mutateAsync: approveApplication } = useMutation({
    mutationFn: approveApplicationById,
    onSuccess: () => {
      toast.success("Заявка одобрена");
    },
    onError: () => {
      toast.error("Произошла ошибка");
    },
  });

  const { mutateAsync: sendEmail, isPending: isPendingEmail } = useMutation({
    mutationFn: sendToEmail,
    onSuccess: async (data) => {
      toast.success("Письмо отправлено!");
    },
    onError: () => {
      toast.error("Письмо не отправлено!");
    },
  });

  const { mutateAsync: createLesson, isPending: isPendingLesson } = useMutation(
    {
      mutationFn: LessonService.create,
      onSuccess: () => {
        toast.success("Занятие создано");
      },
      onError: () => {
        toast.error("Произошла ошибка при создании занятия");
      },
    }
  );

  const { mutateAsync: createReservation, isPending: isPendingReservation } =
    useMutation({
      mutationFn: ReservationService.create,
      onSuccess: async (data) => {
        toast.success("Бронь создана");
        await createLesson({
          reservationId: data.id,
          date: date!,
          time: time!,
        });
      },
      onError: () => {
        toast.error("Произошла ошибка при создании брони");
      },
    });

  return {
    approveApplication,
    sendEmail,
    createLesson,
    createReservation,
    isPendingReservation,
    isPendingLesson,
    isPendingEmail,
  };
};
