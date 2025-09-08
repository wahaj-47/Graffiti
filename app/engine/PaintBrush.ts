import { type FederatedPointerEvent, type PathInstruction } from "pixi.js";
import { Brush, type BrushConfig } from "./Brush";
import { Array, Doc } from "yjs";

export class PaintBrush extends Brush {
  id = "paint-brush";

  onPointerDown(e: FederatedPointerEvent): void {
    const { x, y } = e.global;
    const instructions: PathInstruction[] = [
      {
        action: "moveTo",
        data: [x, y],
      },
      { action: "circle", data: [x, y, this.radius / 64] },
    ];
    this.instructions.push(instructions);
  }

  onPointerMove(e: FederatedPointerEvent): void {
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
    this.instructions = new Array();
  }

  onPointerLeave(e: FederatedPointerEvent): void {
    this.onPointerUp(e);
  }
}
