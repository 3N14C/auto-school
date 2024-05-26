import { NextPage } from "next";
import { FormSignUp } from "./_components/form-sign-up";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <div className="my-auto">
        <FormSignUp />
      </div>
    </div>
  );
};

export default Page;
