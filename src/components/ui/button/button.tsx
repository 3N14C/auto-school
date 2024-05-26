import { cn } from "@/lib/utils";
import { FC } from "react";
import styles from "./button.module.css";

type ButtonVariant = "solid" | "border" | "icon";
interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

export const Button: FC<IProps> = ({
  children,
  variant = "solid",
  className,
  ...props
}) => {
  return (
    <button {...props} className={cn(styles[variant], className)}>
      {children}
    </button>
  );
};
