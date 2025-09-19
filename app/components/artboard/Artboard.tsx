import {
  Container,
  type ContainerOptions,
  type EventMode,
  FederatedPointerEvent,
  Graphics,
  type IHitArea,
  RenderTexture,
} from "pixi.js";
import { extend, type PixiReactElementProps } from "@pixi/react";
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

export function ArtboardComponent(props: PixiReactElementProps<typeof Container>) {
  const [eventMode, setEventMode] = useState<EventMode>("static");
  const history = useYArray<ToolConfig>("history");

  useKeyPress(
    [" "],
    (e) => setEventMode("none"),
    (e) => setEventMode("static"),
  );

  return (
    <pixiContainer eventMode={eventMode} {...props}>
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
