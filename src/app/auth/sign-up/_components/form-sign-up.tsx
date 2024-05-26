"use client";

import { signUp } from "@/actions/auth/sign-up";
import { Button } from "@/components/ui/button/button";
import { InputValidated } from "@/components/ui/input/validated-input";
import { Typography } from "@/components/ui/typography/typography";
import { signUpSchema } from "@/validators/form-signup-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const FormSignUp: FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-session"] });
      toast.success("Вы успешно зарегистрировались");
      router.replace("/");
    },

    onError: () => {
      toast.error("Неверные данные");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    await mutateAsync(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="shadow-[rgba(0,0,0,0.25)] shadow-lg rounded-lg min-w-[600px] min-h-[600px] px-10 text-center py-10"
    >
      <div className="flex flex-col gap-10">
        <Typography variant="text-32" className="font-bold">
          Создать{" "}
          <Typography
            variant="text-32"
            tag="span"
            className="text-[--primary-red]"
          >
            аккаунт
          </Typography>
        </Typography>

        <InputValidated
          placeholder="Введите ваше имя"
          {...register("name")}
          errors={errors.name}
          className=""
        />

        <InputValidated
          placeholder="+7 (___) ___-__-__"
          {...register("phoneNumber")}
          errors={errors.phoneNumber}
          className=""
        />

        <InputValidated
          placeholder="Введите ваш пароль"
          {...register("password")}
          errors={errors.password}
          className=""
        />

        <Button
          className="text-white my-10 w-full flex justify-center"
          type="submit"
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Зарегистрироваться"
          )}
        </Button>

        <div className="flex items-center justify-center gap-3">
          <Typography
            variant="text-16"
            className="text-[--primary-black] font-bold"
          >
            Уже есть аккаунт?{" "}
          </Typography>

          <Link
            href={"/auth/sign-in"}
            className="text-[--primary-red] text-balance font-semibold"
          >
            Войти
          </Link>
        </div>
      </div>
    </form>
  );
};
