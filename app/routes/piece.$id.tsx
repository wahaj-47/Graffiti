import type { Route } from "./+types/piece.$id";
import { Canvas } from "~/components/canvas/Canvas";
import { YProvider } from "~/context/YContext";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Piece" }, { name: "description", content: "Piece" }];
}

export default function Piece({ params }: Route.ComponentProps) {
  const { id } = params;

  return (
    <YProvider path="/join" name={`${id}`}>
      <div className="flex h-screen items-center justify-center bg-zinc-900">
        <Canvas></Canvas>
      </div>
    </YProvider>
  );
}
