interface INavbar {
  id: string;
  title: string;
  href: string;
}

export const navbar: INavbar[] = [
  {
    id: "#about-school",
    title: "об автошколе",
    href: "/",
  },

  {
    id: "#price",
    title: "стоимость обучения",
    href: "/price",
  },

  {
    id: "#faq",
    title: "частые вопросы",
    href: "/faq",
  },

  {
    id: "#contacts",
    title: "связь с нами",
    href: "/contacts",
  },
];
