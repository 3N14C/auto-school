interface IService {
  id: string;
  title: string;
  subtitle: string;
  img: string;
}

export const services: IService[] = [
  {
    id: "1",
    title: `Только \n новые автомобили`,
    subtitle: "Мы регулярно обновляем автопарк",
    img: "/svg/services/car.svg",
  },

  {
    id: "2",
    title: "Опытные инструкторы",
    subtitle: "Стаж каждого инстурктора более 10 лет",
    img: "/svg/services/rudder-car.svg",
  },

  {
    id: "3",
    title: "Автодром в центре города",
    subtitle: "Удобное расположение на пр. Кирова 58/2",
    img: "/svg/services/map-pin.svg",
  },

  {
    id: "4",
    title: "Удобная система оплаты",
    subtitle: "Оплачивайте занятие по QR-коду в машине",
    img: "/svg/services/wallet.svg",
  },
];
