import { useMemo } from "react";

export const GteInfo = ({ value }: { value: string }) => {
  const valueToShow = useMemo(() => value.length <= 2 ? `${value}+` : value, [value]);

  return (
    <div className="bg-purple-50 text-white text-xs font-bold rounded-md p-1 flex items-center justify-center">
      {valueToShow}
    </div>
  );
}