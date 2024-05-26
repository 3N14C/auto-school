"use client";

import { signIn } from "@/actions/auth/sign-in";
import { Button } from "@/components/ui/button/button";
import { InputValidated } from "@/components/ui/input/validated-input";
import { Typography } from "@/components/ui/typography/typography";
import { signInSchema } from "@/validators/form-signin-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const FormSignIn: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-session"] });
      toast.success("Вы успешно вошли в аккаунт");
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
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    await mutateAsync(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="shadow-[rgba(0,0,0,0.25)] shadow-lg rounded-lg min-w-[600px] min-h-[300px] px-10 text-center py-10"
    >
      <div className="flex flex-col gap-10">
        <Typography variant="text-32" className="font-bold">
          Войти в{" "}
          <Typography
            variant="text-32"
            tag="span"
            className="text-[--primary-red]"
          >
            аккаунт
          </Typography>
        </Typography>

        <InputValidated
          placeholder="+7 (___) ___-__-__"
          {...register("phone")}
          errors={errors.phone}
          className=""
        />

        <InputValidated
          placeholder="Пароль"
          {...register("password")}
          errors={errors.password}
          className=""
        />

        <Button
          className="text-white my-10 w-full flex justify-center"
          type="submit"
        >
          {isPending ? (
            <Loader2 className="animate-spin text-center" />
          ) : (
            "Войти"
          )}
        </Button>

        <div className="flex items-center justify-center gap-3">
          <Typography variant="text-16" className="font-bold">
            Нет аккаунта?{" "}
          </Typography>

          <Link
            href={"/auth/sign-up"}
            className="text-[--primary-red] text-base font-semibold"
          >
            Создать аккаунт
          </Link>
        </div>
      </div>
    </form>
  );
};
