import { FC } from "react";
import { AdminHeader } from "./_components/admin-header";

interface IProps {
  children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className="lg:max-w-[1600px] lg:mx-auto my-10">
      <AdminHeader />

      <div className="mt-20">{children}</div>
    </div>
  );
};

export default Layout;
