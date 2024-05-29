"use client";

import { cn } from "@/lib/utils";
import { animated, useSpring } from "@react-spring/web";
import { Menu, X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Logo } from "../logo";
import { Navbar } from "./navbar";
import { usePathname } from "next/navigation";

export const MobileHeader: FC = () => {
  const pathname = usePathname();
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
    document.body.classList.add("no-scroll");
  };

  const handleCloseMenu = () => {
    menuApi.start({ x: -100, opacity: 0 });
    setOpen(false);
    document.body.classList.remove("no-scroll");
  };

  useEffect(() => {
    handleCloseMenu();
  }, [pathname]);

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
          "fixed top-0 right-0 w-full h-screen z-60 bg-white",
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
