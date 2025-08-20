import type { FederatedPointerEvent } from "pixi.js";
import type { Doc } from "yjs";
import { Brush, type BrushConfig } from "./Brush";

class PaintBrush extends Brush {
  constructor(config: BrushConfig) {
    super(config);
  }

  onPointerDown(e: FederatedPointerEvent, doc: Doc): void {
    // @TODO: Start transaction for a new brush stroke
  }
  onPointerMove(e: FederatedPointerEvent, doc: Doc): void {
    // @TODO: Add transactions for each pointer event
  }
  onPointerUp(e: FederatedPointerEvent, doc: Doc): void {
    // @TODO: Finish and commit transaction
  }
}
