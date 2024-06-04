"use client";

import { priceList } from "@/lib/price-list";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { PriceCard } from "./price-card";
import { Title } from "@/components/ui/title";

export const PriceSection: FC = () => {
  return (
    <div id="price" className="">
      <Title title="Стоимость обучения" />
      <div
        className={cn(
          "grid mt-5 lg:grid-cols-2 lg:gap-0 gap-5 items-center justify-items-center",
          {}
        )}
      >
        {priceList.map((card) => (
          <PriceCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};
