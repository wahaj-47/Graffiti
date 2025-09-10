import { Application } from "@pixi/react";
import type { FederatedPointerEvent } from "pixi.js";
import { useRef } from "react";
import { useUndoManger, useYDoc } from "~/context/YContext";
import { PaintBrush } from "~/engine/tools/PaintBrush";
import type { Tool } from "~/engine/tools/Tool";
import { useKeyPress } from "~/hooks/useKeys";
import { ViewportComponent as Viewport } from "~/components/viewport/Viewport";
import { ArtboardComponent as Artboard } from "~/components/artboard/Artboard";

export function Canvas() {
  const doc = useYDoc();

  const tool = useRef<Tool>(new PaintBrush(doc, { radius: 10, color: "red" }));
  const onPointerDown = (event: FederatedPointerEvent) => tool.current.onPointerDown(event);
  const onPointerUp = (event: FederatedPointerEvent) => tool.current.onPointerUp(event);
  const onPointerUpOutside = (event: FederatedPointerEvent) => tool.current.onPointerUpOutside(event);
  const onPointerMove = (event: FederatedPointerEvent) => tool.current.onPointerMove(event);
  const onPointerOver = (event: FederatedPointerEvent) => tool.current.onPointerOver(event);
  const onPointerOut = (event: FederatedPointerEvent) => tool.current.onPointerOut(event);
  const onPointerEnter = (event: FederatedPointerEvent) => tool.current.onPointerEnter(event);
  const onPointerLeave = (event: FederatedPointerEvent) => tool.current.onPointerLeave(event);
  const onPointerCancel = (event: FederatedPointerEvent) => tool.current.onPointerCancel(event);
  const onPointerTap = (event: FederatedPointerEvent) => tool.current.onPointerTap(event);

  const undoManager = useUndoManger();
  useKeyPress(["ctrl+z"], (e) => undoManager.undo());
  useKeyPress(["ctrl+shift+z"], (e) => undoManager.redo());

  return (
    <Application width={window.innerWidth} height={window.innerHeight} resizeTo={window}>
      <Viewport>
        <Artboard
          width={1280}
          height={720}
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
        ></Artboard>
      </Viewport>
    </Application>
  );
}
