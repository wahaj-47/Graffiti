import { Container, type EventMode, FederatedPointerEvent, Graphics, type IHitArea, RenderTexture } from "pixi.js";
import { extend } from "@pixi/react";
import { type ToolConfig } from "~/types";
import { useYArray } from "~/context/YContext";
import { Layer } from "~/engine/core/Layer";
import { useState } from "react";
import { PaintBrush } from "~/components/tool/PaintBrush";
import { Eraser } from "../tool/Eraser";
import { useKeyPress } from "~/hooks/useKeys";

extend({ Container, Layer, RenderTexture });

const registry = {
  "paint-brush": PaintBrush,
  "eraser-tool": Eraser,
};

type ArtboardComponentProps = {
  hitArea?: IHitArea | null;
  onPointerDown?: (e: FederatedPointerEvent) => void;
  onPointerUp?: (e: FederatedPointerEvent) => void;
  onPointerUpOutside?: (e: FederatedPointerEvent) => void;
  onPointerMove?: (e: FederatedPointerEvent) => void;
  onPointerOver?: (e: FederatedPointerEvent) => void;
  onPointerOut?: (e: FederatedPointerEvent) => void;
  onPointerEnter?: (e: FederatedPointerEvent) => void;
  onPointerLeave?: (e: FederatedPointerEvent) => void;
  onPointerCancel?: (e: FederatedPointerEvent) => void;
  onPointerTap?: (e: FederatedPointerEvent) => void;
};

export function ArtboardComponent({
  hitArea,
  onPointerDown,
  onPointerUp,
  onPointerUpOutside,
  onPointerMove,
  onPointerOver,
  onPointerOut,
  onPointerEnter,
  onPointerLeave,
  onPointerCancel,
  onPointerTap,
}: ArtboardComponentProps) {
  const [eventMode, setEventMode] = useState<EventMode>("static");
  const history = useYArray<ToolConfig>("history");

  useKeyPress(
    [" "],
    (e) => setEventMode("none"),
    (e) => setEventMode("static"),
  );

  return (
    <pixiContainer
      hitArea={hitArea}
      eventMode={eventMode}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerUpOutside={onPointerUpOutside}
      onPointerMove={onPointerMove}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerCancel}
      onPointerTap={onPointerTap}
    >
      <pixiLayer>
        {history.toArray().map((command, index) => {
          const Command = registry[command.id as keyof typeof registry];
          if (!Command) return null;
          return <Command key={index} index={index}></Command>;
        })}
      </pixiLayer>
    </pixiContainer>
  );
}
