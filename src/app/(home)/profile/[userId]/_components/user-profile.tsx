"use client";

import { signOut } from "@/actions/auth/sign-out";
import { UserService } from "@/actions/user/user-service";
import { Button } from "@/components/ui/button/button";
import { useCurrentSession } from "@/hooks/use-current-session";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "sonner";

interface IProps {
  userId: string;
}

export const UserProfile: FC<IProps> = ({ userId }) => {
  const router = useRouter();
  const { user: currentUser } = useCurrentSession();

  const { data: user } = useQuery({
    queryKey: ["user-by-id", userId],
    queryFn: async () => await UserService.getById({ id: userId }),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      toast.success("Вы вышли из аккаунта");
      router.replace("/");
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
          src={"/images/unknown-avatar.jpg"}
          alt="profile"
          width={1000}
          height={1000}
          className="rounded-sm w-80 h-80 -z-30"
        />

        {currentUser?.role === "USER" && (
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
        )}
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-2xl font-bold capitalize">Ваше имя: {user?.name}</p>
        <p className="text-2xl font-bold">Ваш номер: {user?.phone}</p>
        <p className="text-2xl font-bold">Количество часов: {user?.driveHours}</p>
      </div>
    </div>
  );
};
