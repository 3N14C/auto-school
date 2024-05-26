import Image from "next/image";
import { FC } from "react";
import { Typography } from "./typography/typography";
import { Link } from "next-view-transitions";

export const Logo: FC = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Image src={"/svg/car-logo.svg"} alt="logo" width={70} height={70} />

      <div className="">
        <Typography
          variant="text-16"
          className="tracking-[0.2em] text-[--primary-gray] flex flex-col leading-4"
        >
          автошкола
          <Typography variant="text-24" tag="span" className="tracking-normal">
            Drive<span className="text-[--primary-red]">Leader</span>
          </Typography>
        </Typography>
      </div>
    </Link>
  );
};
