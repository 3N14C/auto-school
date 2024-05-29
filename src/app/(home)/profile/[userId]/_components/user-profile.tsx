"use client";

import { signOut } from "@/actions/auth/sign-out";
import { Button } from "@/components/ui/button/button";
import { useCurrentSession } from "@/hooks/use-current-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "sonner";

export const UserProfile: FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useCurrentSession();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-session"] });
      toast.success("Вы вышли из аккаунта");
      router.push("/");
    },
  });

  const handleSignOut = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex lg:flex-row flex-col items-center gap-10">
      <div className="flex flex-col gap-4">
        <Image
          src={
            "https://t3.ftcdn.net/jpg/05/70/71/06/360_F_570710660_Jana1ujcJyQTiT2rIzvfmyXzXamVcby8.jpg"
          }
          alt="profile"
          width={1000}
          height={1000}
          className="rounded-sm w-80 h-80 -z-30"
        />

        <Button
          onClick={handleSignOut}
          disabled={isPending}
          variant="border"
          className="flex justify-center"
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Выйти из аккаунта"
          )}
        </Button>
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-2xl font-bold capitalize">Ваше имя: {user?.name}</p>
        <p className="text-2xl font-bold">Ваш номер: {user?.phone}</p>
      </div>
    </div>
  );
};
