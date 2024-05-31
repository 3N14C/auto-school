"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Title } from "@/components/ui/title";
import { useMutations } from "@/hooks/use-mutations";
import { reservationTimes } from "@/lib/reservation-times";
import { UserReservation } from "@/types/user-types";
import { LessonPlace } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { toast } from "sonner";
import moment from "moment";

interface IProps {
  user: UserReservation;
}

export const UserReservationCreate: FC<IProps> = ({ user }) => {
  const [selectType, setSelectType] = useState<LessonPlace>("AUTODROME");
  const [selectTime, setSelectTime] = useState<string>("8:00");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const currentDate = moment().format("YYYY-MM-DD");
  const selectedDate = moment(date).format("YYYY-MM-DD");
  const currentTime = moment().format("HH:mm");
  const selectedTime = moment(selectTime, "HH:mm").format("HH:mm");
  const { createLesson, isPendingLesson } = useMutations({});

  const disabledButton = (time: string) => {
    if (
      user.reservation?.lessons
        .filter(
          (lesson) =>
            moment(lesson.date).format("YYYY-MM-DD") === selectedDate &&
            lesson.status === "PENDING"
        )
        .map((lesson) => lesson.time)
        .includes(time)
    ) {
      return true;
    }
  };

  const handleCreateLesson = async () => {
    if (currentDate > selectedDate)
      return toast.error("Нельзя записаться на прошедшую дату");
    if (
      currentDate === new Date(date!).toLocaleDateString() &&
      currentTime >= moment("19:30", "HH:mm").format("HH:mm")
    )
      return toast.error("Нельзя записаться на сегодня");
    if (!user.reservation) return;

    await createLesson({
      date: date!,
      reservationId: user.reservation.id,
      time: selectTime,
    });
  };

  return (
    <div className="">
      <Title title="Записаться на вождение" />

      <div className="flex flex-col gap-4 items-center">
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-3">
            <Button
              variant={selectType === "CITY" ? "default" : "outline"}
              onClick={() => setSelectType("CITY")}
              disabled={user && user?.driveHours < 10}
            >
              Город
            </Button>
            <Button
              variant={selectType === "AUTODROME" ? "default" : "outline"}
              onClick={() => setSelectType("AUTODROME")}
            >
              Автодром
            </Button>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>

        <div className="flex items-center gap-3">
          {reservationTimes.map((time) => (
            <div key={time.id} className="">
              <Button
                disabled={disabledButton(time.name)}
                variant={selectTime === time.name ? "default" : "outline"}
                onClick={() => setSelectTime(time.name)}
                className="min-w-[100px]"
              >
                {time.name}
              </Button>
            </div>
          ))}
        </div>

        <Button onClick={handleCreateLesson}>
          {isPendingLesson ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Записаться"
          )}
        </Button>
      </div>
    </div>
  );
};
