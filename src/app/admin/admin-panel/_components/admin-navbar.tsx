"use client";

import { signOut } from "@/actions/auth/sign-out";
import { adminNavbar } from "@/lib/admin-navbar";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Link } from "next-view-transitions";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

export const AdminNavbar: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      router.replace("/");
    },
  });

  const handleSignOut = async () => {
    await mutateAsync();
  };

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
      <p onClick={handleSignOut} className={cn("text-xl cursor-pointer")}>
        {isPending ? <Loader2 className="animate-spin" /> : "Выход"}
      </p>
    </div>
  );
};
