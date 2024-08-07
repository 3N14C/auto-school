"use client";

import { Button } from "@/components/ui/button/button";
import { Typography } from "@/components/ui/typography/typography";
import { Play } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { FC } from "react";

export const MainSection: FC = () => {
  return (
    <div className="">
      <Typography
        variant="text-72"
        className="text-[--primary-black] lg:max-w-[800px]"
      >
        Автошкола &quot;Drive
        <Typography
          variant="text-72"
          tag="span"
          className="text-[--primary-red]"
        >
          Leader
        </Typography>
        &quot; в Иркутске
      </Typography>

      <div className="flex lg:flex-row flex-col items-center justify-between lg:-mt-20 mt-5">
        <div className="flex flex-col lg:gap-10 gap-5">
          <Typography variant="text-24" className="lg:max-w-[850px]">
            Обучаем водителей категории &quot;B&quot; на{" "}
            <Typography
              variant="text-24"
              tag="span"
              className="text-[--primary-red]"
            >
              новых
            </Typography>{" "}
            иномарках с{" "}
            <Typography
              variant="text-24"
              tag="span"
              className="text-[--primary-red]"
            >
              опытными
            </Typography>{" "}
            инструкторами
          </Typography>

          <div className="flex items-center lg:gap-20 gap-5 lg:mt-20">
            <Link href={'#contacts'}>
              <Button>
                <Typography variant="text-18" className="text-white font-bold">
                  Записаться
                </Typography>
              </Button>
            </Link>

            <Button variant="icon">
              <div className="border rounded-full border-[--primary-black] w-fit lg:p-4 p-2">
                <Play className="fill-[--primary-black] text-[--primary-black]" />
              </div>
              <Typography variant="text-18">Посмотреть ролик</Typography>
            </Button>
          </div>
        </div>

        <Image
          src={"/images/car.png"}
          alt="car"
          width={1000}
          height={1000}
          className="-z-20"
        />
      </div>
    </div>
  );
};
