import { useMemo } from "react";
import { FederatedPointerEvent, Rectangle, RenderTexture } from "pixi.js";
import { extend } from "@pixi/react";
import { type ToolConfig } from "~/types";
import { Brush } from "~/components/tool/Brush";
import { useYArray } from "~/context/YContext";
import { Artboard } from "~/engine/core/Artboard";

extend({ Artboard, RenderTexture });

type ArtboardComponentProps = {
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

export function ArtboardComponent({
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
}: ArtboardComponentProps) {
  const history = useYArray<ToolConfig>("history");

  return (
    <pixiArtboard
      width={width}
      height={height}
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
      {history.toArray().map((command, index) => {
        // @TODO: Switch component based on command
        return <Brush key={index} index={index}></Brush>;
      })}
    </pixiArtboard>
  );
}
