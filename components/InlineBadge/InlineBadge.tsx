import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

// eslint-disable-next-line no-shadow
export enum BadgeTypeEnum {
  TV = "TV",
  MOVIE = "MOVIE",
  RECOMMENDATION = "RECOMMENDATION",
  TREND = "TREND",
}

interface Props extends PropsWithChildren<{}> {
  type: BadgeTypeEnum;
  className?: string;
}

const typeClasses = {
  [BadgeTypeEnum.TREND]: "bg-blue-100 text-blue-800",
  [BadgeTypeEnum.MOVIE]: "bg-green-100 text-green-800",
  [BadgeTypeEnum.TV]: "bg-yellow-100 text-yellow-800",
  [BadgeTypeEnum.RECOMMENDATION]: "bg-white text-gray-800",
};

export const InlineBadge = ({ children, className, type }: Props) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        typeClasses[type],
        className
      )}
    >
      {children}
    </span>
  );
};
