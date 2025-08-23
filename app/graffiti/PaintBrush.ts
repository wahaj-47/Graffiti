import { type FederatedPointerEvent, type PathInstruction } from "pixi.js";
import { Brush, type BrushConfig } from "./Brush";

export class PaintBrush extends Brush {
  constructor(config: BrushConfig) {
    super(config);
    this.id = "paint-brush";
  }

  draw(e: FederatedPointerEvent): PathInstruction {
    const { x, y } = e.global;
    const instruction: PathInstruction = {
      action: "circle",
      data: [x, y, this.radius],
    };
    return instruction;
  }
}
