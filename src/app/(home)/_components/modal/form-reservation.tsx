"use client";

import { InputValidated } from "@/components/ui/input/validated-input";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { schemaWithoutPassword } from "./modal-reservation";
import { useMutation } from "@tanstack/react-query";
import { createReservation } from "@/actions/reservation/create-reservation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCurrentSession } from "@/hooks/use-current-session";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button/button";

interface IProps {
  categoryId: string;
}

export const FormReservation: FC<IProps> = ({ categoryId }) => {
  const router = useRouter();
  const { user } = useCurrentSession();
  const currentDate = new Date();
  const [date, setDate] = useState<Date | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schemaWithoutPassword>>({
    resolver: zodResolver(schemaWithoutPassword),
    values: {
      name: user?.name || "",
      phoneNumber: user?.phone || "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      toast.success("Запись на обучение создана!");
      router.push(`/profile/${user?.id}`);
    },
    onError: () => {
      toast.error("Увас уже есть запись на обучение");
    },
  });

  const handleOnSubmit = async (
    data: z.infer<typeof schemaWithoutPassword>
  ) => {
    if (!date || date < currentDate) {
      toast.error("Неверная дата");
      return;
    }

    try {
      await mutateAsync({
        name: data.name,
        phoneNumber: data.phoneNumber,
        categoryId: categoryId,
        userId: user?.id!,
        dateTime: date,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col items-center gap-5"
    >
      <InputValidated
        placeholder="Введите ваше имя"
        errors={errors.name}
        {...register("name")}
      />
      <InputValidated
        placeholder="+7 (___) ___-__-__"
        errors={errors.phoneNumber}
        {...register("phoneNumber")}
      />

      <input
        type="datetime-local"
        className="focus:outline-none w-full py-3"
        onChange={(e) => setDate(new Date(e.target.value))}
      />

      <Button
        disabled={isPending}
        className="text-white w-full flex justify-center"
        type="submit"
      >
        {isPending ? <Loader2 className="animate-spin" /> : "Записаться"}
      </Button>
    </form>
  );
};
