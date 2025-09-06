import { extend } from "@pixi/react";
import { Container, Rectangle } from "pixi.js";
import { canUseDOM } from "~/client/utils";
import { type ToolConfig } from "~/types";
import { useYArray } from "~/context/YContext";
import { Brush } from "../tool/Brush";

extend({ Container });

export function Artboard() {
  const history = useYArray<ToolConfig>("history");

  if (!canUseDOM) return;

  const WIDTH = window.innerWidth - 200;
  const HEIGHT = window.innerHeight - 200;
  const HIT = new Rectangle(0, 0, WIDTH, HEIGHT);

  return (
    <pixiContainer width={WIDTH} height={HEIGHT}>
      <pixiGraphics
        draw={(g) => {
          g.rect(
            (window.innerWidth - WIDTH) / 2,
            (window.innerHeight - HEIGHT) / 2,
            WIDTH,
            HEIGHT,
          ).fill(0x111111);
        }}
      ></pixiGraphics>
      {history.toArray().map((command, index) => {
        // @TODO: Switch component based on command
        return <Brush key={index} index={index}></Brush>;
      })}
    </pixiContainer>
  );
}
