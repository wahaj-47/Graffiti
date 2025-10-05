import { type FederatedPointerEvent, type PathInstruction } from "pixi.js";
import { Brush, type BrushConfig } from "./Brush";
import type { Doc } from "yjs";
import { Tool } from "./Tool";

export interface PaintBrushConfig extends BrushConfig {
  readonly id: "paint-brush";
}

export class PaintBrush extends Brush<PaintBrushConfig> {
  id: PaintBrushConfig["id"] = "paint-brush";

  constructor(doc: Doc, config: Omit<PaintBrushConfig, "id">) {
    super(doc, config);
  }

  protected beginTransaction(e: FederatedPointerEvent): void {
    super.beginTransaction(e);

    const { x, y } = this.getLocalPosition(e);
    const instructions: PathInstruction[] = [
      {
        action: "moveTo",
        data: [x, y],
      },
    ];

    this.transact(instructions);
  }

  onPointerDown(e: FederatedPointerEvent): void {
    super.onPointerDown(e);
    this.beginTransaction(e);
  }

  onPointerMove(e: FederatedPointerEvent): void {
    if (!Tool.isPointerDown || !Tool.isPointerOver) return;

    const { x, y } = this.getLocalPosition(e);
    const instructions: PathInstruction[] = [
      {
        action: "lineTo",
        data: [x, y],
      },
    ];

    this.transact(instructions);
  }

  onPointerUp(e: FederatedPointerEvent): void {
    super.onPointerUp(e);
    this.endTransaction();
  }

  onPointerUpOutside(e: FederatedPointerEvent): void {
    super.onPointerUpOutside(e);
    this.endTransaction();
  }

  onPointerLeave(e: FederatedPointerEvent): void {
    super.onPointerLeave(e);
    if (Tool.isPointerDown) this.endTransaction();
  }

  onPointerEnter(e: FederatedPointerEvent): void {
    super.onPointerEnter(e);
    if (Tool.isPointerDown) this.beginTransaction(e);
  }

  onPointerTap(e: FederatedPointerEvent): void {
    super.onPointerTap(e);
    super.beginTransaction(e);

    const { x, y } = this.getLocalPosition(e);
    const instructions: PathInstruction[] = [
      {
        action: "circle",
        data: [x, y, this.radius / 64],
      },
    ];

    this.transact(instructions);
    this.endTransaction();
  }
}
