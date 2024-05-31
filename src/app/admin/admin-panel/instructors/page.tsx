import { Title } from "@/components/ui/title";
import { NextPage } from "next";
import { FormAddInstructor } from "./_components/form-add-instructor";
import { InstructorsList } from "./_components/instructors-list";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <div className="">
        <Title title="Добавить инструктора" />

        <div className="">
          <FormAddInstructor />
        </div>
      </div>

      <div className="mt-20">
        <Title title="Список инструкторов" />

        <div className="">
          <InstructorsList />
        </div>
      </div>
    </div>
  );
};

export default Page;
