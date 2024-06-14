"use client";

import { UserService } from "@/actions/user/user-service";
import { Title } from "@/components/ui/title";
import { UserReservation } from "@/types/user-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FC } from "react";
import { UserReservationCreate } from "./user-reservation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { LessonService } from "@/actions/lesson/lesson-service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useCurrentSession } from "@/hooks/use-current-session";
import { cn } from "@/lib/utils";

interface IProps {
  userId: string;
}

export const UserSchedule: FC<IProps> = ({ userId }) => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useCurrentSession();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user-reservation", userId],
    queryFn: async () => await UserService.getReservation({ id: userId }),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: LessonService.updateStatus,
    onSuccess: () => {
      toast.success("Выполнено");
      queryClient.fetchQuery({
        queryKey: ["user-reservation", "user-by-id", userId],
      });
    },
  });

  const { mutateAsync: removeLesson, isPending: isPendingRemove } = useMutation(
    {
      mutationFn: LessonService.remove,
      onSuccess: () => {
        toast.success("Урок удален");
        queryClient.fetchQuery({
          queryKey: ["user-reservation", userId],
        });
      },
    }
  );

  const handleChangeStatus = async (lessonId: string) => {
    if (!user) return;

    await mutateAsync({
      userId: user?.id,
      lessonId,
    });
  };

  const handleRemoveLesson = async (lessonId: string) => {
    if (!user) return;

    await removeLesson({
      id: lessonId,
    });
  };

  if (isLoading) {
    return <div className="">Loading...</div>;
  }

  return (
    <div className="">
      <Title title="Мое расписание" />

      <ScrollArea className="h-[400px] px-4">
        <div className="flex flex-col gap-3">
          {user?.reservation?.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={cn("border border-primary rounded-md p-4", {
                "bg-green-600/50": lesson.status === "COMPLETED",
              })}
            >
              <div className="">
                <p className="text-xl">
                  Запись на {new Date(lesson.date).toLocaleDateString()}
                </p>
                <p>Время: {lesson.time}</p>
                <p>
                  Место: {lesson.place === "AUTODROME" ? "Автодром" : "Город"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {currentUser?.role === "ADMIN" &&
                  lesson.status === "PENDING" && (
                    <div className="">
                      <Button
                        disabled={isPending}
                        onClick={() => handleChangeStatus(lesson.id)}
                      >
                        {isPending ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Выполнено"
                        )}
                      </Button>
                    </div>
                  )}
                {lesson.status === "PENDING" && (
                  <Button
                    variant={"destructive"}
                    onClick={() => handleRemoveLesson(lesson.id)}
                  >
                    {isPendingRemove ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Отменить занятие"
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="grid lg:grid-cols-2 mt-10">
        <div className="">
          <Title title="Мой инструктор" />

          <div className="">
            <Image
              src={user?.reservation?.instructor.img ?? ""}
              alt="logo"
              width={1000}
              height={1000}
              className="w-[300px]"
            />
            <div className="flex items-center gap-2">
              <p className="first-letter:capitalize">
                {user?.reservation?.instructor.firstName}
              </p>
              <p className="first-letter:capitalize">
                {user?.reservation?.instructor.lastName}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <Title title="Мой автомобиль" />

          <div className="">
            <Image
              src={user?.reservation?.instructor.car.img ?? ""}
              alt="logo"
              width={1000}
              height={1000}
              className="w-[300px]"
            />
            <div className="flex items-center gap-2">
              <p className="first-letter:capitalize">
                {user?.reservation?.instructor.car.brand}
              </p>
              <p className="first-letter:capitalize">
                {user?.reservation?.instructor.car.model}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <UserReservationCreate user={user ?? ({} as UserReservation)} />
        </div>
      </div>
    </div>
  );
};
