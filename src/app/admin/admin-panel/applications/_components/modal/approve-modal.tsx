"use client";

import { ApplicationService } from "@/actions/application/application-service";
import { Button } from "@/components/ui/button/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ticketId: string;
}

export const ApproveModal: FC<IProps> = ({ ticketId, open, setOpen }) => {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [instructorId, setInstructorId] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
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
          <div className="flex items-center gap-3">
            <Calendar
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              mode="single"
            />
            <div className="flex flex-col gap-4">
              <Select onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select onValueChange={setInstructorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Инструктор" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {instructors?.map((instructor) => (
                      <SelectItem key={instructor.id} value={instructor.id}>
                        {instructor.firstName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Время" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {reservationTimes.map((time) => (
                      <SelectItem key={time.id} value={time.name}>
                        {time.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
