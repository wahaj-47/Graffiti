import { type FederatedPointerEvent, type PathInstruction } from "pixi.js";
import { Brush, type BrushConfig } from "./Brush";
import { Array } from "yjs";

export class PaintBrush extends Brush {
  constructor(config: BrushConfig) {
    super(config);
    this.id = "paint-brush";
  }

  onPointerDown(e: FederatedPointerEvent): Array<unknown> {
    this.instructions = new Array();
    const { x, y } = e.global;
    const instructions: PathInstruction[] = [
      {
        action: "moveTo",
        data: [x, y],
      },
    ];
    this.instructions.push(instructions);
    return this.instructions;
  }

  onPointerMove(e: FederatedPointerEvent): void {
    if (this.instructions) {
      const { x, y } = e.global;
      const instructions: PathInstruction[] = [
        {
          action: "lineTo",
          data: [x, y],
        },
      ];
      this.instructions.push(instructions);
    }
  }

  onPointerUp(e: FederatedPointerEvent): void {
    this.instructions = undefined;
  }

  onPointerLeave(e: FederatedPointerEvent): void {
    this.onPointerUp(e);
  }
}
