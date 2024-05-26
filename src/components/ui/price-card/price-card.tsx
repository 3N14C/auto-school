"use client";

import { ModalReservation } from "@/app/(home)/_components/modal/modal-reservation";
import { useCurrentSession } from "@/hooks/use-current-session";
import { IPriceList } from "@/lib/price-list";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Button } from "../button/button";
import { Typography } from "../typography/typography";
import { Category } from "@prisma/client";

interface IProps {
  card: Category;
}

export const PriceCard: FC<IProps> = ({ card }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const { user } = useCurrentSession();
  const router = useRouter();

  const handleCreateReservation = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    if (!user) {
      router.replace("/auth/sign-in");
      return;
    }

    setOpen(true);
    setCategoryId(id);
  };

  return (
    <div className="text-center flex flex-col gap-7 bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.25)] rounded-2xl px-4 py-10 lg:w-2/3">
      <ModalReservation categoryId={categoryId} open={open} setOpen={setOpen} />
      <Typography variant="text-32" className="text-[--primary-red] font-bold">
        {card.name}
      </Typography>

      <Typography className="text-[--primary-black] max-w-[300px] mx-auto">
        {card.description}
      </Typography>

      <Typography className="text-[--primary-black]">
        {card.practice}
      </Typography>

      <Typography className="text-[--primary-black]">{card.theory}</Typography>

      <Typography className="text-[--primary-black]">
        {card.practiceExam}
      </Typography>

      <Typography className="text-[--primary-black]">{card.exam}</Typography>

      <Typography variant="text-54" className="text-black font-bold">
        {card.price.toLocaleString("ru-RU", {
          style: "currency",
          currency: "RUB",
          maximumFractionDigits: 0,
        })}
      </Typography>

      <Button
        onClick={(e) => handleCreateReservation(e, card.id)}
        className="max-w-fit mx-auto text-white"
      >
        Записаться
      </Button>
    </div>
  );
};
