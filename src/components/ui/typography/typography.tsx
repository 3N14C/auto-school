"use client";

import { FC } from "react";
import styles from "./typography.module.css";
import { cn } from "@/lib/utils";

type Tag = "p" | "span";
type TypographyVariant =
  | "text-16"
  | "text-18"
  | "text-20"
  | "text-24"
  | "text-32"
  | "text-54"
  | "text-72";
type TypographyProps = {
  variant?: TypographyVariant;
  className?: string;
  children: React.ReactNode;
  tag?: Tag;
} & React.HTMLAttributes<HTMLParagraphElement>;

export const Typography: FC<TypographyProps> = ({
  children,
  className,
  variant = "text-16",
  tag = "p",
  ...props
}) => {
  const Component = tag;

  return (
    <Component {...props} className={cn(styles[variant], className)}>
      {children}
    </Component>
  );
};
