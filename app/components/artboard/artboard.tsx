import { Application, extend } from "@pixi/react";
import { Container, FederatedPointerEvent, Graphics, Rectangle } from "pixi.js";
import { useCallback, useState } from "react";
import { canUseDOM } from "~/client/utils";

const WIDTH = 1280;
const HEIGHT = 720;
const HIT = new Rectangle(0, 0, WIDTH, HEIGHT);

extend({ Container, Graphics });

export function Artboard() {
  const [drawing, setDrawing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const beginDrawing = (event: FederatedPointerEvent) => {
    setDrawing(true);
  };

  const endDrawing = (event: FederatedPointerEvent) => {
    setDrawing(false);
  };

  const updatePosition = (event: FederatedPointerEvent) => {
    const { x, y } = event.global;
    setPosition({ x, y });
  };

  const draw = useCallback(
    (g: Graphics) => {
      if (drawing) {
        g.setFillStyle({ color: "red" });
        g.circle(position.x, position.y, 10);
        g.fill();
      }
    },
    [position]
  );

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
      >
        <pixiGraphics draw={draw} />
      </pixiContainer>
    </Application>
  );
}
