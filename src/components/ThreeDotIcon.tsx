import { SVGProps } from "react";

export const ThreeDotIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg fill="currentColor" viewBox="0 0 32 32" {...props}>
      <circle cx="16" cy="8" r="2" />
      <circle cx="16" cy="16" r="2" />
      <circle cx="16" cy="24" r="2" />
    </svg>
  );
};
