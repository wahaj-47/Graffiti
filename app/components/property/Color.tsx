import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SquareIcon } from "lucide-react";

export function Color() {
  const [color, setColor] = useState("#ffffff");

  return (
    <Popover>
      <div className="flex flex-row items-center border rounded-sm pl-1">
        <PopoverTrigger asChild>
          <SquareIcon fill={color} stroke="transparent" className="mr-1"></SquareIcon>
        </PopoverTrigger>
        <HexColorInput color={color} onChange={setColor} className="uppercase w-[120px]" />
      </div>
      <PopoverContent className="w-fit bg-primary border-0 shadow-lg/30">
        <HexColorPicker color={color} onChange={setColor} />
      </PopoverContent>
    </Popover>
  );
}
