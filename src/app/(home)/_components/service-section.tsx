import { ServiceCard } from "@/components/ui/service-card/service-card";
import { Typography } from "@/components/ui/typography/typography";
import { services } from "@/lib/services";
import { FC } from "react";

export const ServiceSection: FC = () => {
  return (
    <div className="">
      <Typography
        variant="text-32"
        className="text-[--primary-black] text-center font-bold"
      >
        Автошкола &quot;DriveLeader&quot; работает с 2008 года <br /> и за это
        время выпустила более 7000 выпускников
      </Typography>

      <div className="grid lg:grid-cols-4 items-start gap-20 mt-20">
        {services.map((service) => (
          <ServiceCard
            img={service.img}
            key={service.id}
            className="text-center max-h-[300px] h-full"
          >
            <Typography
              variant="text-18"
              className="font-bold text-[--primary-red]"
            >
              {service.title}
            </Typography>

            <Typography variant="text-18" className="text-[--primary-black]">
              {service.subtitle}
            </Typography>
          </ServiceCard>
        ))}
      </div>
    </div>
  );
};
