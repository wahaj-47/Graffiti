import type { Route } from "./+types/piece.$id";
import { Artboard } from "~/artboard/artboard";

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
