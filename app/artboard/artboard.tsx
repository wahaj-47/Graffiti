import { Application, extend } from "@pixi/react";
import { FederatedPointerEvent, Graphics, Rectangle } from "pixi.js";
import { useCallback, useState } from "react";

extend({ Graphics });

export function Artboard() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: FederatedPointerEvent) => {
    const { x, y } = event.global;
    setPosition({ x, y });
  };

  const draw = useCallback(
    (g: Graphics) => {
      g.setFillStyle({ color: "red" });
      g.circle(position.x, position.y, 10);
      g.fill();
    },
    [position]
  );

  return (
    <Application width={1280} height={720}>
      <pixiGraphics
        eventMode="dynamic"
        interactive={true}
        onPointerMove={handlePointerMove}
        hitArea={new Rectangle(0, 0, 1280, 720)}
        draw={draw}
      />
    </Application>
  );
}
