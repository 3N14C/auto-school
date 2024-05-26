"use client";

import { useCurrentSession } from "@/hooks/use-current-session";
import Image from "next/image";
import { FC } from "react";

export const UserProfile: FC = () => {
  const { user } = useCurrentSession();

  return (
    <div className="flex items-center gap-10">
      <Image
        src={
          "https://t3.ftcdn.net/jpg/05/70/71/06/360_F_570710660_Jana1ujcJyQTiT2rIzvfmyXzXamVcby8.jpg"
        }
        alt="profile"
        width={1000}
        height={1000}
        className="rounded-sm w-80 h-80"
      />

      <div className="flex flex-col gap-5">
        <p className="text-2xl font-bold capitalize">Ваше имя: {user?.name}</p>
        <p className="text-2xl font-bold">Ваш номер: {user?.phone}</p>
      </div>
    </div>
  );
};
