interface INavbar {
  id: string;
  title: string;
  href: string;
}

export const navbar: INavbar[] = [
  {
    id: "1",
    title: "об автошколе",
    href: "/",
  },

  {
    id: "2",
    title: "инструкторы",
    href: "/instructors",
  },

  {
    id: "3",
    title: "стоимость обучения",
    href: "/price",
  },

  {
    id: "4",
    title: "частые вопросы",
    href: "/faq",
  },

  {
    id: "5",
    title: "контакты",
    href: "/contacts",
  },
];
