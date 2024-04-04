import React from "react";
import { cn } from "@/lib/utils";

type PropType = React.PropsWithChildren &
  React.HTMLAttributes<HTMLButtonElement> & {
    disabled?: boolean;
    className?: string;
  };

export const Button = ({ children, className, ...props }: PropType) => {
  return (
    <button
      className={cn(
        "bg-[#273139] disabled:bg-gray-500 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
