import { useEffect } from "react";
import type { Route } from "./+types/piece.$id";
import { Artboard } from "~/components/artboard/artboard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Piece" }, { name: "description", content: "Piece" }];
}

export default function Piece({ params }: Route.ComponentProps) {
  return (
    <div className="flex h-screen items-center justify-center">
      <Artboard></Artboard>
    </div>
  );
}
