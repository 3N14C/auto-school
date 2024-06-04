"use client";

import { getAllCars } from "@/actions/car/get-all";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { CarModal } from "./modal/car-modal";

export const CarsList: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [carId, setCarId] = useState<string>("");

  const { data: cars, isLoading } = useQuery({
    queryKey: ["all-cars"],
    queryFn: getAllCars,
    refetchInterval: 2000
  });

  return (
    <div className="grid lg:grid-cols-3 w-1/2">
      {cars?.map((car) => (
        <div key={car.id} className="">
          <CarModal open={open} setOpen={setOpen} carId={carId} />
          <div
            onClick={() => {
              setCarId(car.id);
              setOpen(true);
            }}
            className="border border-primary rounded-lg p-4 max-w-fit hover:bg-zinc-200 transition duration-300 cursor-pointer"
          >
            <p>
              {car.brand} {car.model}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
