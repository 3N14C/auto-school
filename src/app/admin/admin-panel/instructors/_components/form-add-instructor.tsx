"use client";

import { CarService } from "@/actions/car/car-service";
import { InstructorService } from "@/actions/instructor/instructor-service";
import { Button } from "@/components/ui/button/button";
import { InputValidated } from "@/components/ui/input/validated-input";
import { cn } from "@/lib/utils";
import { formAddInstructor } from "@/validators/form-add-instructor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const FormAddInstructor: FC = () => {
  const queryClient = useQueryClient();
  const [carId, setCarId] = useState<string>("");

  const { data: cars } = useQuery({
    queryKey: ["cars"],
    queryFn: CarService.getAll,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formAddInstructor>>({
    resolver: zodResolver(formAddInstructor),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: InstructorService.create,
    onSuccess: () => {
      toast.success("Инструктор добавлен");
      queryClient.invalidateQueries();
      setCarId("");
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof formAddInstructor>) => {
    if (carId === "") return toast.error("Выберите марку автомобиля");

    await mutateAsync({
      ...data,
      carId,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
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
        placeholder="https://"
        errors={errors.img}
      />

      <div className="grid lg:grid-cols-5 mt-5">
        {cars?.map((car) => (
          <div key={car.id} className="">
            <div
              onClick={() => setCarId(car.id)}
              className={cn(
                "border border-primary rounded-lg p-4 max-w-fit transition duration-300 cursor-pointer",
                {
                  "hover:bg-zinc-200": carId !== car.id,
                  "bg-[--primary-red] text-white border-[--primary-red]":
                    carId === car.id,
                }
              )}
            >
              <p>
                {car.brand} {car.model}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button disabled={isPending} className="text-white mt-5">
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Добавить инструктора"
        )}
      </Button>
    </form>
  );
};
