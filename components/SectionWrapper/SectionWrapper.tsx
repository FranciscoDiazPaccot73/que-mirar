import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

export const SectionWrapper = ({
  children,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <div className={cn("w-full px-4 py-6 rounded bg-modal", className)}>
      {children}
    </div>
  );
};
