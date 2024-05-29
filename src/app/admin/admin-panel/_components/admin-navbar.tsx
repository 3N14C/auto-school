"use client";

import { adminNavbar } from "@/lib/admin-navbar";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { FC } from "react";

export const AdminNavbar: FC = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-20 w-full justify-center">
      {adminNavbar.map((nav) => (
        <div key={nav.id} className="">
          <Link
            href={nav.href}
            className={cn("text-xl text-zinc-400", {
              "text-black": pathname === nav.href,
            })}
          >
            {nav.name}
          </Link>
        </div>
      ))}
    </div>
  );
};
