import { Application } from "@pixi/react";
import { Container, type ContainerChild, type FederatedPointerEvent } from "pixi.js";
import { useRef } from "react";
import { useUndoManger } from "~/context/YContext";
import { useKeyPress } from "~/hooks/useKeys";
import { ViewportComponent as Viewport } from "~/components/viewport/Viewport";
import { ArtboardComponent as Artboard } from "~/components/artboard/Artboard";
import type { Viewport as PixiViewport } from "~/engine/core/Viewport";
import { useTool } from "~/context/ToolContext";

export function Canvas() {
  const artboardRef = useRef<Container<ContainerChild>>(null);

  const { tool } = useTool();
  const onPointerDown = (event: FederatedPointerEvent) => tool.onPointerDown(event);
  const onPointerUp = (event: FederatedPointerEvent) => tool.onPointerUp(event);
  const onPointerUpOutside = (event: FederatedPointerEvent) => tool.onPointerUpOutside(event);
  const onPointerMove = (event: FederatedPointerEvent) => tool.onPointerMove(event);
  const onPointerOver = (event: FederatedPointerEvent) => tool.onPointerOver(event);
  const onPointerOut = (event: FederatedPointerEvent) => tool.onPointerOut(event);
  const onPointerEnter = (event: FederatedPointerEvent) => tool.onPointerEnter(event);
  const onPointerLeave = (event: FederatedPointerEvent) => tool.onPointerLeave(event);
  const onPointerCancel = (event: FederatedPointerEvent) => tool.onPointerCancel(event);
  const onPointerTap = (event: FederatedPointerEvent) => tool.onPointerTap(event);

  const onMovedEnd = (viewport: PixiViewport) => {
    if (!artboardRef.current) return;
    artboardRef.current.hitArea = viewport.hitArea;
  };

  const undoManager = useUndoManger();
  useKeyPress(["ctrl+z"], (e) => undoManager.undo());
  useKeyPress(["ctrl+shift+z"], (e) => undoManager.redo());

  return (
    <Application width={window.innerWidth} height={window.innerHeight} resizeTo={window} backgroundAlpha={0}>
      <Viewport drag pinch wheel decelerate onMovedEnd={onMovedEnd}>
        <Artboard
          ref={artboardRef}
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
