import { NextPage } from "next";
import { ApplicationsList } from "./_components/applications-list";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <ApplicationsList />
    </div>
  );
};

export default Page;
