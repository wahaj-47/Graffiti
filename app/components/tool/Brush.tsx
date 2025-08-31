import { extend } from "@pixi/react";
import { Graphics, GraphicsPath, type PathInstruction } from "pixi.js";
import { memo, useCallback, useMemo } from "react";
import type { Array } from "yjs";
import { useObserve, useYArray } from "~/context/YContext";
import type { BrushProps } from "~/types";

extend({ Graphics });

export const Brush = memo(({ index }: BrushProps) => {
  const instructions = useYArray<Array<unknown>>("instructions", "none").get(
    index
  );
  useObserve(instructions, "deep");

  const path = new GraphicsPath(instructions?.toArray() as PathInstruction[]);

  const draw = useCallback(
    (g: Graphics) => {
      g.clear();
      g.path(path).stroke({
        width: 5,
        color: 0xc3b1e1,
        cap: "round",
        join: "round",
      });
    },
    [path]
  );

  return <pixiGraphics draw={draw}></pixiGraphics>;
});
