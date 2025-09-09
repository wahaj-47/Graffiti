import { type FederatedPointerEvent, type PathInstruction } from "pixi.js";
import { Brush, type BrushConfig } from "./Brush";
import { Array, Doc } from "yjs";

export class PaintBrush extends Brush {
  id = "paint-brush";

  protected beginTransaction(e: FederatedPointerEvent): void {
    super.beginTransaction(e);
    const { x, y } = e.global;
    const instructions: PathInstruction[] = [
      {
        action: "moveTo",
        data: [x, y],
      },
    ];
    this.instructions.push(instructions);
  }

  onPointerDown(e: FederatedPointerEvent): void {
    super.onPointerDown(e);
    this.beginTransaction(e);
  }

  onPointerMove(e: FederatedPointerEvent): void {
    if (!this.isPointerDown || !this.isPointerOver) return;

    const { x, y } = e.global;
    const instructions: PathInstruction[] = [
      {
        action: "lineTo",
        data: [x, y],
      },
    ];
    this.instructions.push(instructions);
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
    if (this.isPointerDown) this.endTransaction();
  }

  onPointerEnter(e: FederatedPointerEvent): void {
    super.onPointerEnter(e);
    if (this.isPointerDown) this.beginTransaction(e);
  }

  onPointerTap(e: FederatedPointerEvent): void {
    super.onPointerTap(e);
    this.beginTransaction(e);
    const { x, y } = e.global;
    const instructions: PathInstruction[] = [
      {
        action: "circle",
        data: [x, y, this.radius / 64],
      },
    ];
    this.instructions.push(instructions);
    this.endTransaction();
  }
}
