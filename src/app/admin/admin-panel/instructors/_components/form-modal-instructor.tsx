"use client";

import { InstructorService } from "@/actions/instructor/instructor-service";
import { Button } from "@/components/ui/button/button";
import { InputValidated } from "@/components/ui/input/validated-input";
import { formUpdateInstructor } from "@/validators/form-update-instructor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Instructor } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  instructor: Instructor;
}

export const FormModalInstructor: FC<IProps> = ({ instructor }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formUpdateInstructor>>({
    resolver: zodResolver(formUpdateInstructor),
    values: {
      firstName: instructor.firstName,
      lastName: instructor.lastName,
      img: instructor.img ?? "",
    },
  });

  const { mutateAsync: removeById, isPending: isPendingRemove } = useMutation({
    mutationFn: InstructorService.removeById,
    onSuccess: () => {
      toast.success("Инструктор удален");
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: InstructorService.updateById,
    onSuccess: () => {
      toast.success("Инструктор обновлен");
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof formUpdateInstructor>) => {
    await mutateAsync({
      ...data,
      id: instructor.id,
    });
  };

  const handleRemove = async () => {
    await removeById({ id: instructor.id });
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col gap-5"
    >
      <InputValidated
        {...register("firstName")}
        placeholder="Имя"
        errors={errors.firstName}
      />
      <InputValidated
        {...register("lastName")}
        placeholder="Фамилия"
        errors={errors.lastName}
      />
      <InputValidated
        {...register("img")}
        placeholder="Изображение"
        errors={errors.img}
      />

      <div className="flex items-center justify-between">
        <Button
          type="submit"
          disabled={isPending || isPendingRemove}
          className="text-white"
        >
          {isPending ? <Loader2 className="animate-spin" /> : "Сохранить"}
        </Button>

        <Button
          onClick={handleRemove}
          type="button"
          disabled={isPending || isPendingRemove}
          className="text-white"
        >
          {isPendingRemove ? <Loader2 className="animate-spin" /> : "Удалить"}
        </Button>
      </div>
    </form>
  );
};
