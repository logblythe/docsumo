import React from "react";

type PropType = React.PropsWithChildren &
  React.HTMLAttributes<HTMLButtonElement>;
export const Button = ({ children, ...props }: PropType) => {
  return (
    <button className="bg-[#273139]" {...props}>
      {children}
    </button>
  );
};
