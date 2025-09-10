import { extend } from "@pixi/react";
import { Graphics, GraphicsPath, type PathInstruction } from "pixi.js";
import { memo, useCallback, useMemo } from "react";
import { Array } from "yjs";
import { useObserve, useYArray } from "~/context/YContext";
import type { BrushConfig } from "~/engine/tools/Brush";
import type { BrushProps, ToolConfig } from "~/types";

extend({ Graphics });

export const Brush = memo(({ index }: BrushProps) => {
  const config = useYArray<ToolConfig>("history", "none").get(index) as BrushConfig;
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

  return <pixiGraphics draw={draw}></pixiGraphics>;
});
