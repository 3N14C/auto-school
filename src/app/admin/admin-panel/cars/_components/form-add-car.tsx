"use client";

import { createCar } from "@/actions/car/create";
import { Button } from "@/components/ui/button/button";
import { InputValidated } from "@/components/ui/input/validated-input";
import { formAddCar } from "@/validators/form-add-car";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const FormAddCar: FC = () => {
  const queryClinet = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formAddCar>>({
    resolver: zodResolver(formAddCar),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCar,
    onSuccess: () => {
      queryClinet.removeQueries({ queryKey: ["all-cars"] });
      toast.success("Автомобиль добавлен");
      reset();
    },
    onError: () => {
      toast.error("Не удалось добавить машину");
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof formAddCar>) => {
    await mutateAsync({
      ...data,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="flex flex-col gap-5">
        <InputValidated
          placeholder="Бренд"
          {...register("brand")}
          errors={errors.brand}
          className="w-1/2"
        />

        <InputValidated
          placeholder="Модель"
          {...register("model")}
          errors={errors.model}
          className="w-1/2"
        />

        <InputValidated
          placeholder="https://example.com"
          {...register("img")}
          errors={errors.model}
          className="w-1/2"
        />
      </div>

      <Button variant="solid" className="text-white mt-5" type="submit">
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Добавить автомобиль"
        )}
      </Button>
    </form>
  );
};
