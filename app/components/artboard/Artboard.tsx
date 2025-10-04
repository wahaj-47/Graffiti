import {
  Container,
  type ContainerOptions,
  type EventMode,
  FederatedPointerEvent,
  Graphics,
  type IHitArea,
  RenderTexture,
} from "pixi.js";
import { extend, useApplication, type PixiReactElementProps } from "@pixi/react";
import { type ToolConfig } from "~/types";
import { useYArray } from "~/context/YContext";
import { Layer } from "~/engine/core/Layer";
import { useState } from "react";
import { useKeyPress } from "~/hooks/useKeys";
import { Renderer } from "../tool";

extend({ Container, Layer, RenderTexture });

const registry = {
  "paint-brush": Renderer.PaintBrush,
  "eraser-tool": Renderer.Eraser,
};

export function ArtboardComponent(props: PixiReactElementProps<typeof Container>) {
  const [eventMode, setEventMode] = useState<EventMode>("static");
  const history = useYArray<ToolConfig>("history");

  const { app } = useApplication();

  useKeyPress(
    [" "],
    (e) => setEventMode("none"),
    (e) => setEventMode("static"),
  );

  return (
    <pixiContainer eventMode={eventMode} {...props} hitArea={props.hitArea ?? app.screen}>
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
