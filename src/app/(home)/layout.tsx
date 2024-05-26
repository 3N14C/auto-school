import { Header } from "@/components/ui/header/header";
import { MobileHeader } from "@/components/ui/header/mobile-header";
import { FC } from "react";

interface IProps {
  children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className="lg:max-w-[1600px] lg:mx-auto py-10 lg:px-0 px-5">
      <div className="lg:block hidden">
        <Header />
      </div>

      <div className="lg:hidden block">
        <MobileHeader />
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
