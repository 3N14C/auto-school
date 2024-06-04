"use client";

import { removeCarById } from "@/actions/car/remove-by-id";
import { updateCarById } from "@/actions/car/update-by-id";
import { Button } from "@/components/ui/button/button";
import { InputValidated } from "@/components/ui/input/validated-input";
import { formCarModalSchema } from "@/validators/form-car-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Car } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  car: Car;
}

export const FormCarModal: FC<IProps> = ({ car }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formCarModalSchema>>({
    resolver: zodResolver(formCarModalSchema),
    values: {
      brand: car.brand,
      model: car.model,
      img: car.img ?? ''
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formCarModalSchema>) =>
      await updateCarById(car.id, {
        ...data,
      }),
    onSuccess: () => {
      toast.success("Машина обновлена");
      reset();
    },
    onError: () => {
      toast.error("Не удалось обновить машину");
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof formCarModalSchema>) => {
    await mutateAsync({
      ...data,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col gap-3"
    >
      <InputValidated
        placeholder="Бренд"
        {...register("brand")}
        errors={errors.brand}
      />

      <InputValidated
        placeholder="Модель"
        {...register("model")}
        errors={errors.model}
      />

      <InputValidated
        placeholder="https://image.png"
        {...register("img")}
        errors={errors.model}
      />

      <Button type="submit" className="text-white flex justify-center">
        {isPending ? <Loader2 className="animate-spin" /> : "Сохранить"}
      </Button>
    </form>
  );
};
