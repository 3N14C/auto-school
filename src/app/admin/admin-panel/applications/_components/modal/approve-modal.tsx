"use client";

import { ApplicationService } from "@/actions/application/application-service";
import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGeneratePassword } from "@/hooks/use-generate-password";
import { useGetAllQueries } from "@/hooks/use-get-all-queries";
import { useMutations } from "@/hooks/use-mutations";
import { reservationTimes } from "@/lib/reservation-times";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { toast } from "sonner";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ticketId: string;
}

export const ApproveModal: FC<IProps> = ({ ticketId, open, setOpen }) => {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [instructorId, setInstructorId] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const { generatePassword } = useGeneratePassword();
  const { result } = generatePassword(10);
  const { categories, instructors } = useGetAllQueries();
  const { approveApplication, sendEmail, createReservation, isPendingEmail } =
    useMutations({
      date: date!,
      time: time!,
    });

  const { data: application } = useQuery({
    queryKey: ["application", ticketId],
    queryFn: async () =>
      await ApplicationService.getByUserEmail({ id: ticketId }),
  });

  const handleSendToEmail = async () => {
    if (!categoryId) return toast.error("Не выбрана категория");
    if (!instructorId) return toast.error("Не выбран инструктор");
    if (!date) return toast.error("Не выбрана дата");
    if (!time) return toast.error("Не выбрано время");
    if (!application) return;

    await sendEmail({
      email: application.email,
      password: result,
      phone: application.phone,
    });

    await approveApplication({
      id: application.id,
      password: result,
    });

    await createReservation({
      categoryId,
      instructorId,
      userEmail: application.email,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Запись на занятие</DialogTitle>
          <DialogDescription>
            При записи пользователя на занятие, он получит доступ к аккаунту и
            списку занятий.
          </DialogDescription>
        </DialogHeader>

        <div className="">
          <div className="">
            <input
              type="date"
              onChange={(e) => setDate(new Date(e.target.value))}
            />
            <div className="">
              <select
                value={categoryId ?? ""}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Выберите категорию</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={instructorId ?? ""}
                onChange={(e) => setInstructorId(e.target.value)}
              >
                <option value="">Выберите инструктора</option>
                {instructors?.map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.firstName}
                  </option>
                ))}
              </select>
              <select
                value={time ?? ""}
                onChange={(e) => setTime(e.target.value)}
              >
                {reservationTimes.map((time) => (
                  <option key={time.id} value={time.name}>
                    {time.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-10">
            <Button onClick={handleSendToEmail} className="text-white">
              {isPendingEmail ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Одобрить заявку"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
