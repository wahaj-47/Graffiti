import type { FederatedPointerEvent, PathInstruction } from "pixi.js";
import type { Doc } from "yjs";

export interface Tool {
  onPointerDown(e: FederatedPointerEvent, doc: Doc): void;
  onPointerMove(e: FederatedPointerEvent, doc: Doc): void;
  onPointerUp(e: FederatedPointerEvent, doc: Doc): void;
}

export type BrushProps = {
  instructions: PathInstruction[];
};
