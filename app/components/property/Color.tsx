import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SquareIcon } from "lucide-react";

export function Color({ value, onChange }) {
  return (
    <Popover>
      <div className="flex flex-row items-center border rounded-sm pl-1">
        <PopoverTrigger asChild>
          <SquareIcon fill={value} stroke="transparent" className="mr-1"></SquareIcon>
        </PopoverTrigger>
        <HexColorInput color={value} onChange={onChange} className="uppercase w-[120px]" />
      </div>
      <PopoverContent className="w-fit bg-primary border-0 shadow-lg/30">
        <HexColorPicker color={value} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}
