"use client";

import { UserService } from "@/actions/user/user-service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}

export const UserCardModal: FC<IProps> = ({ open, setOpen, email }) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user-approved-ticket", email],
    queryFn: async () => await UserService.getByEmail({ email }),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Обработанная заявка пользователя</DialogTitle>
          <DialogDescription>
            Здесь можно просмотреть информацию о пользователе
          </DialogDescription>
        </DialogHeader>

        <div className="">
          {isLoading && "Loading..."}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={"/images/unknown-avatar.jpg"}
                alt="profile"
                width={1000}
                height={1000}
                className="rounded-full w-[100px]"
              />
              <div className="flex flex-col gap-2">
                <p>Почта: {user?.email}</p>
                <p>ФИО: {user?.name}</p>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <Button>
                <Link href={`/profile/${user?.id}`}>Профиль</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
