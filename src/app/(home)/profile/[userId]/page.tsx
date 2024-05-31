import { NextPage } from "next";
import { UserProfile } from "./_components/user-profile";
import { UserSchedule } from "./_components/user-schedule";

interface Props {
  params: {
    userId: string;
  };
}

const Page: NextPage<Props> = ({ params }) => {
  return (
    <div className="mt-20">
      <UserProfile userId={params.userId} />

      <div className="mt-10">
        <UserSchedule userId={params.userId} />
      </div>
    </div>
  );
};

export default Page;
