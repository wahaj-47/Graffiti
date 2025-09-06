import { useRef } from "react";
import { Array } from "yjs";
import { Application, extend } from "@pixi/react";
import { Container, FederatedPointerEvent, Rectangle } from "pixi.js";
import { canUseDOM } from "~/client/utils";
import { PaintBrush } from "~/graffiti/PaintBrush";
import { type Tool, type ToolConfig } from "~/types";
import { useUndoManger, useYArray, useYDoc } from "~/context/YContext";
import { Brush } from "../tool/Brush";
import { useKeyPress } from "~/hooks/useKeys";

const WIDTH = 1280;
const HEIGHT = 720;
const HIT = new Rectangle(0, 0, WIDTH, HEIGHT);

extend({ Container });

export function Artboard() {
  const doc = useYDoc();
  const history = useYArray<ToolConfig>("history");
  const instructions = useYArray<Array<unknown>>("instructions", "none");
  const undoManager = useUndoManger();

  useKeyPress(["ctrl+z"], (e) => undoManager.undo());
  useKeyPress(["ctrl+shift+z"], (e) => undoManager.redo());

  const tool = useRef<Tool>(new PaintBrush({ radius: 1, color: "red" }));

  const onPointerDown = (event: FederatedPointerEvent) => {
    doc.transact(() => {
      history.push([tool.current.getConfig()]);
      instructions.push([tool.current.onPointerDown(event)]);
    });
  };

  const onPointerMove = (event: FederatedPointerEvent) => {
    tool.current.onPointerMove(event);
  };

  const onPointerUp = (event: FederatedPointerEvent) => {
    tool.current.onPointerUp(event);
  };

  const onPointerLeave = (event: FederatedPointerEvent) => {
    tool.current.onPointerLeave(event);
  };

  if (!canUseDOM) return;

  return (
    <Application width={WIDTH} height={HEIGHT}>
      <pixiContainer
        hitArea={HIT}
        eventMode="dynamic"
        interactive={true}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
      >
        {history.toArray().map((command, index) => {
          // @TODO: Switch component based on command
          return <Brush key={index} index={index}></Brush>;
        })}
      </pixiContainer>
    </Application>
  );
}
