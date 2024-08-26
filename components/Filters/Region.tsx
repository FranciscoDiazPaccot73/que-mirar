import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageContext } from "@/context";

import { availableRegions } from "@/utils";
import { useContext } from "react";
import { Label } from "../ui/label";

interface Props {
  onChangeRegion: (arg: string) => void;
  selectedFilter: () => void;
}

export const Region = ({ onChangeRegion, selectedFilter }: Props) => {
  const {
    state: {
      watchRegion = "AR",
    },
  } = useContext(PageContext);

  const handleChangeRegion = (value: string) => {
    onChangeRegion(value);
    selectedFilter();
  };

  return (
    <Select value={watchRegion} onValueChange={handleChangeRegion}>
      <div className="w-full">
        <Label className="text-white text-xs" htmlFor="region">
          Región
        </Label>
        <SelectTrigger id="region">
          <SelectValue placeholder="Región" />
        </SelectTrigger>
      </div>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Regiones</SelectLabel>
          {availableRegions.map((region: string) => (
            <SelectItem key={`region-${region}`} value={region}>
              {region}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}