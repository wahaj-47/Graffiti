import { extend } from "@pixi/react";
import { EraserIcon } from "lucide-react";
import { Graphics, GraphicsPath, type PathInstruction } from "pixi.js";
import { memo, useCallback } from "react";
import { Array } from "yjs";
import { useObserve, useYArray } from "~/context/YContext";
import type { EraserConfig } from "~/engine/tools/Eraser";
import type { ToolRendererProps, ToolConfig, ToolDefinition } from "~/types";

extend({ Graphics });

const Renderer = memo(({ index }: ToolRendererProps) => {
  const config = useYArray<ToolConfig>("history", "none").get(index) as EraserConfig;
  const instructions = useYArray<Array<unknown>>("instructions", "none").get(index);
  useObserve(instructions, "deep");

  const path = new GraphicsPath(instructions?.toArray() as PathInstruction[]);

  const draw = useCallback(
    (g: Graphics) => {
      g.clear();
      g.path(path).stroke({
        width: config.radius,
        cap: "round",
        join: "round",
      });
      g.blendMode = "erase";
    },
    [path],
  );

  return <pixiGraphics draw={draw} cullable></pixiGraphics>;
});

const Details = () => {
  return <div></div>;
};

export const Eraser: ToolDefinition<EraserConfig> = {
  id: "eraser-tool",
  defaultConfig: { radius: 10 },
  shortcut: "e",
  Icon: EraserIcon,
  Renderer: Renderer,
  Details: Details,
};
