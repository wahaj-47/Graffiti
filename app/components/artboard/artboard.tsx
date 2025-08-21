import { useEffect, useRef } from "react";
import type { HocuspocusProvider } from "@hocuspocus/provider";
import * as Y from "yjs";
import { Application, extend } from "@pixi/react";
import { Container, FederatedPointerEvent, Graphics, Rectangle } from "pixi.js";
import { canUseDOM } from "~/client/utils";
import { PaintBrush } from "~/graffiti/PaintBrush";
import { type Tool } from "~/types";

const WIDTH = 1280;
const HEIGHT = 720;
const HIT = new Rectangle(0, 0, WIDTH, HEIGHT);

extend({ Container, Graphics });

type ArtboardProps = {
  provider: HocuspocusProvider | null;
};

export function Artboard({ provider }: ArtboardProps) {
  const ydoc = useRef<Y.Doc>(null);
  const tool = useRef<Tool>(new PaintBrush({ radius: 10, color: 0xc3b1e1 }));

  useEffect(() => {
    // ydoc.current = new Y.Doc();
  }, []);

  const beginDrawing = (event: FederatedPointerEvent) => {
    if (ydoc.current == null) return;
    tool.current.onPointerDown(event, ydoc.current);
  };

  const endDrawing = (event: FederatedPointerEvent) => {
    if (ydoc.current == null) return;
    tool.current.onPointerUp(event, ydoc.current);
  };

  const updatePosition = (event: FederatedPointerEvent) => {
    if (ydoc.current == null) return;
    tool.current.onPointerMove(event, ydoc.current);
  };

  if (!canUseDOM) return;

  return (
    <Application width={WIDTH} height={HEIGHT}>
      <pixiContainer
        hitArea={HIT}
        eventMode="dynamic"
        interactive={true}
        onPointerDown={beginDrawing}
        onPointerUp={endDrawing}
        onPointerLeave={endDrawing}
        onPointerMove={updatePosition}
      ></pixiContainer>
    </Application>
  );
}
