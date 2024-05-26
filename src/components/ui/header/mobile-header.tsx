"use client";

import { cn } from "@/lib/utils";
import { animated, useSpring } from "@react-spring/web";
import { Menu, X } from "lucide-react";
import { FC, useState } from "react";
import { Logo } from "../logo";
import { Navbar } from "./navbar";

export const MobileHeader: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [menuSpring, menuApi] = useSpring(
    () => ({
      from: { x: -100, opacity: 0 },
    }),
    [open]
  );

  const handleOpenMenu = () => {
    menuApi.start({ x: 0, opacity: 1 });
    setOpen(true);
  };

  const handleCloseMenu = () => {
    menuApi.start({ x: -100, opacity: 0 });
    setOpen(false);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <Logo />

        <Menu
          onClick={handleOpenMenu}
          size={35}
          className="text-[--primary-red]"
        />
      </div>

      <animated.div
        style={menuSpring}
        className={cn(
          "absolute top-0 right-0 w-full h-screen z-60 bg-white overflow-hidden",
          {}
        )}
      >
        <X
          size={35}
          className="text-[--primary-red]"
          onClick={handleCloseMenu}
        />
        <Navbar />
      </animated.div>
    </div>
  );
};
