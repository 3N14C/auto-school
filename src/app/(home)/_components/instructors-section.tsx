"use client";

import { InstructorService } from "@/actions/instructor/instructor-service";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Title } from "@/components/ui/title";
import { images } from "@/lib/autopark-images";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

export const InstructorsSection: FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const { data: instructors, isLoading } = useQuery({
    queryKey: ["instructors-all"],
    queryFn: InstructorService.getAll,
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="">
      <Title title="Наши инструктора" />

      <Carousel
        opts={{ align: "start" }}
        className="lg:w-full mt-20"
        setApi={setApi}
      >
        <CarouselContent>
          {instructors?.map(({ id, img, firstName, lastName }) => (
            <CarouselItem key={id} className="lg:basis-1/2">
              <Image
                src={img ?? ""}
                alt=""
                width={1000}
                height={1000}
                className="lg:w-full"
              />
              <div className="flex items-center gap-2 text-2xl">
                <p className="capitalize">{firstName}</p>
                <p>{lastName}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-evenly mt-10">
          <CarouselPrevious
            variant={current === 1 ? "default" : "destructive"}
            className="lg:w-10 lg:h-10"
            size={"icon"}
          />
          <CarouselNext
            variant={current === images.length - 1 ? "default" : "destructive"}
            size={"icon"}
            className="lg:w-10 lg:h-10"
          />
        </div>
      </Carousel>
    </div>
  );
};
