import { useState, type DetailedHTMLProps, type HTMLElementType, type InputHTMLAttributes } from "react";
import { Input } from "../ui/input";

export function Number(props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return <Input {...props} type="number" autoComplete="off"></Input>;
}
