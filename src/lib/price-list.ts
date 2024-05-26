export interface IPriceList {
  id: string;
  title: string;
  description: string;

  practice: string;
  theory: string;
  practiceInsideExam: string;
  practiceOutsideExam: string;

  price: number;
}

export const priceList: IPriceList[] = [
  {
    id: "1",
    title: "Категория В МКПП",
    description:
      "Легковой автомобиль с механической коробкой переключения передач",
    practice: "Практика 28 занятий (56 часов)",
    theory: "Теория 138 академических часов",
    practiceInsideExam: "Практический внутренний экзамен",
    practiceOutsideExam: "Практический экзамен в ГИБДД",
    price: 51000,
  },

  {
    id: "2",
    title: "Категория В АКПП",
    description:
      "Легковой автомобиль с автоматической коробкой переключения передач",
    practice: "Практика 27 занятий (54 часов)",
    theory: "Теория 138 академических часов",
    practiceInsideExam: "Практический внутренний экзамен",
    practiceOutsideExam: "Практический экзамен в ГИБДД",
    price: 49500,
  },
];
