import type { Route } from "./+types/piece.$id";
import { Artboard } from "~/components/artboard/artboard";
import { useHocuspocusProvider } from "~/hooks/useHocuspocus";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Piece" }, { name: "description", content: "Piece" }];
}

export default function Piece({ params }: Route.ComponentProps) {
  const { id } = params;

  const provider = useHocuspocusProvider({
    path: "/piece",
    name: `piece-${id}`,
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <Artboard provider={provider}></Artboard>
    </div>
  );
}
