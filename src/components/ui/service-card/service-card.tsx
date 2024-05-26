import { cn } from "@/lib/utils";
import { icons } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  children: React.ReactNode;
  img: string;
  className?: string;
}

export const ServiceCard: FC<IProps> = ({ children, img, className }) => {
  return (
    <div
      className={cn(
        "bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.25)] rounded-2xl px-4 py-2",
        className
      )}
    >
      <div className="flex flex-col gap-5 items-center relative -top-10">
        <Image src={img} alt="logo" width={60} height={60} className="" />

        {children}
      </div>
    </div>
  );
};
