import { FC } from "react";
import { Logo } from "../logo";
import { Navbar } from "./navbar";
import { PhoneNumber } from "./phone-number";

export const Header: FC = () => {
  return (
    <div className="flex items-center justify-between">
      <Logo />

      <Navbar />

      <PhoneNumber />
    </div>
  );
};
