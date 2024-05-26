import { Title } from "@/components/ui/title";
import { faqs } from "@/lib/faqs";
import { FC } from "react";
import { FaqCard } from "./faq-card";

export const FaqSection: FC = () => {
  return (
    <div className="">
      <Title title="Вы часто нас спрашиваете" className="text-center" />

      <div className="grid lg:grid-cols-2 items-start gap-5 mt-10">
        {faqs.map((faq) => (
          <FaqCard key={faq.id} faq={faq} />
        ))}
      </div>
    </div>
  );
};
