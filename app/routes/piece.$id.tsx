import { ToolDetails } from "~/components/tool-details/tool-details";
import type { Route } from "./+types/piece.$id";
import { Canvas } from "~/components/canvas/Canvas";
import { Toolbar } from "~/components/toolbar/Toolbar";
import { ToolProvider } from "~/context/ToolContext";
import { YProvider } from "~/context/YContext";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Piece" }, { name: "description", content: "Piece" }];
}

export default function Piece({ params }: Route.ComponentProps) {
  const { id } = params;

  return (
    <YProvider path="/join" name={`${id}`}>
      <ToolProvider>
        <div className="bg-zinc-900">
          <Toolbar></Toolbar>
          <ToolDetails></ToolDetails>
          <Canvas></Canvas>
        </div>
      </ToolProvider>
    </YProvider>
  );
}
