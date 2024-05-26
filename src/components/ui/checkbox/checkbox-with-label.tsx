"use client";

import { FC, forwardRef } from "react";
import { Checkbox } from "../checkbox";
import { Typography } from "../typography/typography";

interface IProps {
  title: string;
}

export const CheckboxLabel: FC<IProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-4">
      <Checkbox className="border-[--primary-red]" />

      <Typography>{title}</Typography>
    </div>
  );
};
