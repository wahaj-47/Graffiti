import type { Route } from "./+types/piece.$id";
import { Canvas } from "~/components/viewport/Canvas";
import { YProvider } from "~/context/YContext";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Piece" }, { name: "description", content: "Piece" }];
}

export default function Piece({ params }: Route.ComponentProps) {
  const { id } = params;

  return (
    <YProvider path="/join" name={`${id}`}>
      <div className="flex h-screen items-center justify-center">
        <Canvas></Canvas>
      </div>
    </YProvider>
  );
}
