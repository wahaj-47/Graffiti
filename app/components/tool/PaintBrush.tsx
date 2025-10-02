import { extend } from "@pixi/react";
import { Graphics, GraphicsPath, type PathInstruction } from "pixi.js";
import { memo, useCallback, useEffect, useRef } from "react";
import { Array, Map } from "yjs";
import { useObserve, useYArray } from "~/context/YContext";
import type { BrushConfig } from "~/engine/tools/Brush";
import type { ToolProps, ToolConfig } from "~/types";

extend({ Graphics });

export const PaintBrush = memo(({ index }: ToolProps) => {
  const config = useYArray<Map<unknown>>("history", "none").get(index);
  const json = config.toJSON() as BrushConfig;
  useObserve(config);

  const instructions = useYArray<Array<unknown>>("instructions", "none").get(index);
  useObserve(instructions, "deep");

  const path = new GraphicsPath(instructions?.toArray() as PathInstruction[]);

  const draw = useCallback(
    (g: Graphics) => {
      g.clear();
      g.path(path).stroke({
        width: json.radius,
        color: json.color,
        cap: "round",
        join: "round",
      });
      g.dirty = json.dirty;
    },
    [path],
  );

  return <pixiGraphics draw={draw} cullable></pixiGraphics>;
});
