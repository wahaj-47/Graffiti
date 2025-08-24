import { extend } from "@pixi/react";
import { Graphics, GraphicsPath } from "pixi.js";
import { useCallback, useMemo } from "react";
import type { BrushProps } from "~/types";

extend({ Graphics });

export function Brush({ instructions }: BrushProps) {
  const path = useMemo(() => new GraphicsPath(instructions), [instructions]);

  const draw = useCallback(
    (g: Graphics) => {
      g.clear();
      g.path(path).fill({ color: 0xc3b1e1 });
    },
    [instructions]
  );

  return <pixiGraphics draw={draw}></pixiGraphics>;
}
