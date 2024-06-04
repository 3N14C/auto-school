"use client";

import { createApplication } from "@/actions/application/create-application";
import { Button } from "@/components/ui/button/button";
import { InputValidated } from "@/components/ui/input/validated-input";
import { schema } from "@/validators/form-event-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMask } from "@react-input/mask";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const FormEvent: FC = () => {
  const inputRef = useMask({
    mask: "+7 (___) ___-__-__",
    replacement: { _: /\d/ },
    showMask: true,
  });
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      toast.success("Заявка создана. Мы скоро свяжимся с вами!");
      reset();
    },
    onError: () => {
      toast.error("Не удалось создать заявку");
      reset();
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof schema>) => {
    await mutateAsync({
      name: data.name,
      phoneNumber: data.phoneNumber,
      email: data.email,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col gap-10"
    >
      <InputValidated
        {...register("email")}
        placeholder="Введите вашу почту"
        errors={errors.email}
      />

      <InputValidated
        {...register("name")}
        placeholder="Введите ваше имя"
        errors={errors.name}
      />

      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <InputValidated
            {...field}
            ref={inputRef}
            placeholder="Введите ваш номер телефона"
            errors={errors.phoneNumber}
          />
        )}
      />

      <Button
        disabled={isPending}
        type="submit"
        className="w-full h-20 text-white font-bold mt-10 flex justify-center items-center"
        variant="solid"
      >
        {isPending ? <Loader2 className="animate-spin" /> : "Оставить заявку"}
      </Button>
    </form>
  );
};
