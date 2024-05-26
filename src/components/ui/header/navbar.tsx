"use client";

import { navbar } from "@/lib/navbar";
import { FC } from "react";
import { Typography } from "../typography/typography";

export const Navbar: FC = () => {
  return (
    <div className="flex lg:flex-row flex-col items-center gap-10">
      {navbar.map((item) => (
        <div key={item.id} className="">
          <Typography
            variant="text-18"
            className="text-[--primary-black] first-letter:uppercase font-bold"
          >
            {item.title}
          </Typography>
        </div>
      ))}
    </div>
  );
};
