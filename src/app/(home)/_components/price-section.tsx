// "use client";

// import { getAllCategories } from "@/actions/category/get-all";
// import { PriceCard } from "@/components/ui/price-card/price-card";
// import { cn } from "@/lib/utils";
// import { useQuery } from "@tanstack/react-query";
// import { FC } from "react";

// export const PriceSection: FC = () => {
//   const { data: categories, isLoading } = useQuery({
//     queryKey: ["all-categories"],
//     queryFn: getAllCategories,
//   });

//   return (
//     <div
//       className={cn("grid lg:gap-0 gap-5 items-center justify-items-center", {
//         "lg:grid-cols-2": categories && categories?.length > 1,
//         "w-1/2 mx-auto": categories && categories.length === 1,
//       })}
//     >
//       {categories?.map((card) => <PriceCard key={card.id} card={card} />)}
//     </div>
//   );
// };
