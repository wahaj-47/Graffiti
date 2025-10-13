import { extend } from "@pixi/react";
import { PaintbrushIcon } from "lucide-react";
import { Graphics, GraphicsPath, type PathInstruction } from "pixi.js";
import { memo, useCallback } from "react";
import { Array } from "yjs";
import { useObserve, useYArray } from "~/context/YContext";
import type { PaintBrushConfig } from "~/engine/tools/PaintBrush";
import type { ToolRendererProps, ToolConfig, ToolDefinition } from "~/types";
import { PaintBrush as Engine } from "~/engine/tools/PaintBrush";

extend({ Graphics });

const Renderer = memo(({ index }: ToolRendererProps) => {
  const config = useYArray<ToolConfig>("history", "none").get(index) as PaintBrushConfig;
  const instructions = useYArray<Array<unknown>>("instructions", "none").get(index);
  useObserve(instructions, "deep");

  const path = new GraphicsPath(instructions?.toArray() as PathInstruction[]);

  const draw = useCallback(
    (g: Graphics) => {
      g.clear();
      g.path(path).stroke({
        width: config.radius,
        color: config.color,
        cap: "round",
        join: "round",
      });
    },
    [path],
  );

  return <pixiGraphics draw={draw} cullable></pixiGraphics>;
});

export const PaintBrush: ToolDefinition<PaintBrushConfig> = {
  id: "paint-brush",
  name: "Paint Brush",
  defaultConfig: { color: 0x110000, radius: 10 },
  shortcut: "b",
  Icon: PaintbrushIcon,
  Renderer: Renderer,
  Engine: Engine,
};
