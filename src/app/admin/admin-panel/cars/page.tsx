import { Title } from "@/components/ui/title";
import { NextPage } from "next";
import { CarsList } from "./_components/cars-list";
import { FormAddCar } from "./_components/form-add-car";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <div className="">
        <Title title="Список автомобилей" />
        <CarsList />
      </div>

      <div className="mt-20">
        <Title title="Добавить автомобиль" />
        <FormAddCar />
      </div>
    </div>
  );
};

export default Page;
