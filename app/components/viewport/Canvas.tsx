import { Application } from "@pixi/react";
import type { FederatedPointerEvent } from "pixi.js";
import { useRef } from "react";
import { useUndoManger, useYDoc } from "~/context/YContext";
import { PaintBrush } from "~/engine/PaintBrush";
import type { Tool } from "~/engine/Tool";
import { useKeyPress } from "~/hooks/useKeys";
import { GraffitiViewport as Viewport } from "./Viewport";
import { Artboard } from "../artboard/Artboard";

export function Canvas() {
  const doc = useYDoc();

  const tool = useRef<Tool>(new PaintBrush(doc, { radius: 1, color: "red" }));
  const onPointerDown = (event: FederatedPointerEvent) => tool.current.onPointerDown(event);
  const onPointerMove = (event: FederatedPointerEvent) => tool.current.onPointerMove(event);
  const onPointerUp = (event: FederatedPointerEvent) => tool.current.onPointerUp(event);
  const onPointerLeave = (event: FederatedPointerEvent) => tool.current.onPointerLeave(event);

  const undoManager = useUndoManger();
  useKeyPress(["ctrl+z"], (e) => undoManager.undo());
  useKeyPress(["ctrl+shift+z"], (e) => undoManager.redo());

  return (
    <Application width={window.innerWidth} height={window.innerHeight} resizeTo={window}>
      <Viewport>
        <Artboard></Artboard>
      </Viewport>
    </Application>
  );
}
