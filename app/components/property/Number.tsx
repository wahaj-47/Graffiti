import { useState, type DetailedHTMLProps, type HTMLElementType, type InputHTMLAttributes } from "react";
import { Input } from "../ui/input";

export function Number(props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };
  return <Input {...props} value={value} onChange={handleChange} type="number" autoComplete="off"></Input>;
}
