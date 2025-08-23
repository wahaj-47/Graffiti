import { useRef, useEffect, useState } from "react";
import type { HocuspocusProvider } from "@hocuspocus/provider";
import { Array, Map } from "yjs";
import { Application, extend } from "@pixi/react";
import { Container, FederatedPointerEvent, Graphics, Rectangle } from "pixi.js";
import { canUseDOM } from "~/client/utils";
import { PaintBrush } from "~/graffiti/PaintBrush";
import { type Command, type Tool } from "~/types";

const WIDTH = 1280;
const HEIGHT = 720;
const HIT = new Rectangle(0, 0, WIDTH, HEIGHT);

extend({ Container, Graphics });

type ArtboardProps = {
  provider: HocuspocusProvider;
};

export function Artboard({ provider }: ArtboardProps) {
  const yState = useRef<Array<Map<unknown>>>(
    provider.document.getArray("state")
  );

  const tool = useRef<Tool>(new PaintBrush({ radius: 10, color: 0xc3b1e1 }));
  const instructions = useRef<Array<unknown>>(null);

  useEffect(() => {
    yState.current.observeDeep((events, transaction) => {
      console.log(yState.current.toJSON());
    });
  }, [provider]);

  const onPointerDown = (event: FederatedPointerEvent) => {
    instructions.current = new Array<unknown>();

    yState.current.push([
      new Map([
        ["tool", tool.current.id],
        ["instructions", instructions.current],
      ]),
    ]);

    instructions.current.push([tool.current.onPointerDown(event)]);
  };

  const onPointerMove = (event: FederatedPointerEvent) => {
    if (!instructions.current) return;
    instructions.current.push([tool.current.onPointerMove(event)]);
  };

  const onPointerUp = (event: FederatedPointerEvent) => {
    tool.current.onPointerUp(event);
    instructions.current = null;
  };

  const onPointerLeave = (event: FederatedPointerEvent) => {
    tool.current.onPointerLeave(event);
    instructions.current = null;
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
      ></pixiContainer>
    </Application>
  );
}
