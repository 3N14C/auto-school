"use client";

import { navbar } from "@/lib/navbar";
import { FC } from "react";
import { Typography } from "../typography/typography";
import { useCurrentSession } from "@/hooks/use-current-session";
import { Link } from "next-view-transitions";

export const Navbar: FC = () => {
  const { user, isLoading } = useCurrentSession();

  const linkToProfile = user
    ? user.role === "ADMIN"
      ? `/admin/admin-panel/applications`
      : `/profile/${user.id}`
    : "/auth/sign-in";

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

      <Link href={linkToProfile}>
        <Typography
          variant="text-18"
          className="text-[--primary-black] first-letter:uppercase font-bold"
        >
          Личный кабинет
        </Typography>
      </Link>

      {/* {user ? (
        <Link href={`/profile/${user.id}`}>
          <Typography
            variant="text-18"
            className="text-[--primary-black] first-letter:uppercase font-bold"
          >
            Личный кабинет
          </Typography>
        </Link>
      ) : (
        <Link href={"/auth/sign-in"}>
          <Typography
            variant="text-18"
            className="text-[--primary-black] first-letter:uppercase font-bold"
          >
            Войти
          </Typography>
        </Link>
      )} */}
    </div>
  );
};
