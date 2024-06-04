import { cn } from "@/lib/utils";
import { FC, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputValidatedProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldError | undefined;
  className?: string;
  placeholder?: string;
}

export const InputValidated = forwardRef<HTMLInputElement, InputValidatedProps>(
  ({ errors, className, placeholder, ...props }, ref) => {
    return (
      <>
        <input
          {...props}
          ref={ref}
          className={cn(
            "w-full bg-[--primary-light-gray] border-b border-[--primary-black] placeholder:text-gray-400 focus:outline-none focus:border-b-black sm:text-sm lg:text-lg h-20 transition duration-300",
            className
          )}
          placeholder={placeholder}
        />

        {errors && <p className="text-red-500 text-lg">{errors.message}</p>}
      </>
    );
  }
);

InputValidated.displayName = "InputValidated";
