"use client";

import { IPriceList, priceList } from "@/lib/price-list";
import { FC } from "react";

interface IProps {
  card: IPriceList;
}

export const PriceCard: FC<IProps> = ({ card }) => {
  return (
    <div className="bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.25)] rounded-2xl px-6 py-4">
      <div className="text-center flex flex-col gap-10">
        <p className="text-2xl font-semibold">{card.title}</p>
        <p className="text-xl max-w-[350px]">{card.description}</p>
        <p className="text-xl">{card.practice}</p>
        <p className="text-xl">{card.theory}</p>
        <p className="text-xl">{card.practiceInsideExam}</p>
        <p className="text-xl">{card.practiceOutsideExam}</p>
        <p className="text-3xl font-semibold">
          {card.price.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
    </div>
  );
};
