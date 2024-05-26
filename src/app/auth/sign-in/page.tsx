import { NextPage } from "next";
import { FormSignIn } from "./_components/form-sign-in";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <div className="my-auto">
        <FormSignIn />
      </div>
    </div>
  );
};

export default Page;
