"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Typography } from "@/components/ui/typography/typography";
import { IFaq } from "@/interfaces/faq.interface";
import { cn } from "@/lib/utils";
import { useSpring, animated } from "@react-spring/web";
import { Plus } from "lucide-react";
import { FC, useState } from "react";

interface IProps {
  faq: IFaq;
}

export const FaqCard: FC<IProps> = ({ faq }) => {
  const [open, setOpen] = useState<string | null>(null);
  const [ticketSpring, ticketApi] = useSpring(
    () => ({
      from: { y: -100, opacity: 0 },
    }),
    [open]
  );

  const handleOpen = (id: string) => {
    if (open === id) {
      setOpen(null);
      ticketApi.start({ y: -100, opacity: 0 });
    } else {
      setOpen(id);
      ticketApi.start({ y: 0, opacity: 1 });
    }
  };

  return (
    <Accordion
      type="multiple"
      className="shadow-[0_0_10px_0_rgba(0,0,0,0.15)] rounded-lg px-4"
    >
      <AccordionItem value={faq.id}>
        <AccordionTrigger>
          <Typography variant="text-18">{faq.question}</Typography>
        </AccordionTrigger>

        <AccordionContent>
          <Typography variant="text-18">{faq.answer}</Typography>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    // <div
    //   onClick={() => handleOpen(faq.id)}
    //   className="bg-white  px-4 py-5 cursor-pointer"
    // >
    //   <div className="flex items-center justify-between">
    //     <Typography variant="text-18">{faq.question}</Typography>
    //     <Plus className="text-[--primary-red]" />
    //   </div>

    //   <animated.div style={ticketSpring}>
    //     <Typography variant="text-18">{faq.answer}</Typography>
    //   </animated.div>
    // </div>
  );
};
