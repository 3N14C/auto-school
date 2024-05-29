"use client";

import { useCurrentSession } from "@/hooks/use-current-session";
import { Loader2, PhoneCall, User } from "lucide-react";
import { Link } from "next-view-transitions";
import { FC } from "react";
import { Button } from "../button/button";
import { Typography } from "../typography/typography";

export const PhoneNumber: FC = () => {
  const { user, isLoading } = useCurrentSession();

  return (
    <div className="flex items-center gap-3">
      <Button variant="border" className="flex items-center gap-3">
        <PhoneCall />
        <Typography
          variant="text-18"
          className="text-[--primary-black] font-bold"
        >
          +7 (3822) 43-32-02
        </Typography>
      </Button>

      {/* {isLoading && <Loader2 className="animate-spin" />}

      {user && (
        <Link href={`/profile/${user.id}`}>
          <User />
        </Link>
      )} */}
    </div>
  );
};
