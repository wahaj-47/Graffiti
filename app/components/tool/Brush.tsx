import { extend } from "@pixi/react";
import { Graphics, GraphicsPath } from "pixi.js";
import { useCallback } from "react";
import type { BrushProps } from "~/types";

extend({ Graphics });

export function Brush({ instructions }: BrushProps) {
  console.log(instructions);

  const draw = useCallback(
    (g: Graphics) => {
      const path = new GraphicsPath(instructions);
      g.path(path).fill({ color: 0xc3b1e1 });
    },
    [instructions]
  );

  return <pixiGraphics draw={draw}></pixiGraphics>;
}
