import type { HocuspocusProvider } from "@hocuspocus/provider";
import { Application, extend } from "@pixi/react";
import { Container, FederatedPointerEvent, Graphics, Rectangle } from "pixi.js";
import { useCallback, useState } from "react";
import { canUseDOM } from "~/client/utils";

const WIDTH = 1280;
const HEIGHT = 720;
const HIT = new Rectangle(0, 0, WIDTH, HEIGHT);

extend({ Container, Graphics });

type ArtboardProps = {
  provider: HocuspocusProvider | null;
};

export function Artboard({ provider }: ArtboardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState(0xc3b1e1);
  const [strokes, setStrokes] = useState<BrushProps[]>([]);

  const beginDrawing = (event: FederatedPointerEvent) => {
    setStrokes((prevStrokes) => {
      const newStroke: BrushProps = {
        active: true,
        color: color,
      };

      return [...prevStrokes, newStroke];
    });
  };

  const endDrawing = (event: FederatedPointerEvent) => {};

  const updatePosition = (event: FederatedPointerEvent) => {
    const { x, y } = event.global;
    setPosition({ x, y });
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
