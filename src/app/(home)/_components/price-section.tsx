"use client";

import { getAllCategories } from "@/actions/category/get-all";
import { PriceCard } from "@/components/ui/price-card/price-card";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

export const PriceSection: FC = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["all-categories"],
    queryFn: getAllCategories,
  });

  return (
    <div className="grid lg:grid-cols-2 lg:gap-0 gap-5 items-center justify-items-center">
      {categories?.map((card) => <PriceCard key={card.id} card={card} />)}
    </div>
  );
};
