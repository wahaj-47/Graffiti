import { extend } from "@pixi/react";
import { Container, FederatedPointerEvent, Rectangle } from "pixi.js";
import { canUseDOM } from "~/client/utils";
import { type ToolConfig } from "~/types";
import { useYArray } from "~/context/YContext";
import { Brush } from "../tool/Brush";

extend({ Container });

type ArtboardProps = {
  width: number;
  height: number;
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

export function Artboard({
  width,
  height,
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
}: ArtboardProps) {
  const history = useYArray<ToolConfig>("history");

  if (!canUseDOM) return;

  return (
    <pixiContainer
      width={width}
      height={height}
      eventMode="dynamic"
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
      <pixiGraphics
        draw={(g) => {
          g.rect(0, 0, width, height).fill(0xf1f1f1);
        }}
      ></pixiGraphics>
      {history.toArray().map((command, index) => {
        // @TODO: Switch component based on command
        return <Brush key={index} index={index}></Brush>;
      })}
    </pixiContainer>
  );
}
