import { FederatedPointerEvent, Rectangle, RenderTexture } from "pixi.js";
import { extend, useApplication } from "@pixi/react";
import { type ToolConfig } from "~/types";
import { useYArray } from "~/context/YContext";
import { Artboard } from "~/engine/core/Artboard";
import { useMemo } from "react";
import { PaintBrush } from "~/components/tool/PaintBrush";
import { Eraser } from "../tool/Eraser";

extend({ Artboard, RenderTexture });

const registry = {
  "paint-brush": PaintBrush,
  "eraser-tool": Eraser,
};

type ArtboardComponentProps = {
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
  const { app } = useApplication();
  const hitArea = useMemo(() => app.screen, []);

  return (
    <pixiArtboard
      hitArea={hitArea}
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
        const Command = registry[command.id as keyof typeof registry];
        if (!Command) return null;
        return <Command key={index} index={index}></Command>;
      })}
    </pixiArtboard>
  );
}
