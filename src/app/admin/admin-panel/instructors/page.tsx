import { Title } from "@/components/ui/title";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <Title title="Список инструкторов" />
    </div>
  );
};

export default Page;
