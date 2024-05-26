import { NextPage } from "next";
import { UserProfile } from "./_components/user-profile";

interface Props {
  params: {
    userId: string;
  };
}

const Page: NextPage<Props> = ({ params }) => {
  return (
    <div className="mt-20">
      <UserProfile />
    </div>
  );
};

export default Page;
