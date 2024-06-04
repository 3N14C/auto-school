import { Typography } from "@/components/ui/typography/typography";
import { FC } from "react";
import { FormEvent } from "./form";

export const EventFormSection: FC = () => {
  return (
    <div id="contacts" className="">
      <Typography
        variant="text-54"
        className="font-bold text-[--primary-black]"
      >
        Оставьте заявку, мы свяжимся с вами.
      </Typography>

      <div className="mt-20">
        <FormEvent />
      </div>
    </div>
  );
};
