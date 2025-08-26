import { useEffect, useRef } from "react";
import { Array, Map } from "yjs";
import { Application, extend } from "@pixi/react";
import { Container, FederatedPointerEvent, Graphics, Rectangle } from "pixi.js";
import { canUseDOM } from "~/client/utils";
import { PaintBrush } from "~/graffiti/PaintBrush";
import { type Tool } from "~/types";
import { useYArray } from "~/context/YContext";
import { Brush } from "../tool/Brush";

const WIDTH = 1280;
const HEIGHT = 720;
const HIT = new Rectangle(0, 0, WIDTH, HEIGHT);

extend({ Container, Graphics });

export function Artboard() {
  const history = useYArray<string>("history");
  const instructions = useYArray<Array<unknown>>("instructions", "none");

  const tool = useRef<Tool>(new PaintBrush({ radius: 10, color: 0xc3b1e1 }));

  const onPointerDown = (event: FederatedPointerEvent) => {
    history.push([tool.current.id]);
    instructions.push([tool.current.onPointerDown(event)]);
  };

  const onPointerMove = (event: FederatedPointerEvent) => {
    tool.current.onPointerMove(event);
  };

  const onPointerUp = (event: FederatedPointerEvent) => {
    tool.current.onPointerUp(event);
  };

  const onPointerLeave = (event: FederatedPointerEvent) => {
    tool.current.onPointerLeave(event);
  };

  if (!canUseDOM) return;

  return (
    <Application width={WIDTH} height={HEIGHT}>
      <pixiContainer
        hitArea={HIT}
        eventMode="dynamic"
        interactive={true}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
      >
        {history.toArray().map((command, index) => {
          // @TODO: Switch component based on command
          return <Brush key={index} index={index}></Brush>;
        })}
      </pixiContainer>
    </Application>
  );
}
