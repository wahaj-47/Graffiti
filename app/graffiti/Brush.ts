import type { FederatedPointerEvent, PathInstruction } from "pixi.js";
import { Array } from "yjs";
import type { Tool } from "~/types";

export type BrushConfig = {
  color: string | number;
  radius: number;
};

export abstract class Brush implements Tool {
  public id;
  public color;
  public radius;

  constructor({ color, radius }: BrushConfig) {
    this.id = "brush";
    this.color = color;
    this.radius = radius;
  }

  abstract draw(e: FederatedPointerEvent): PathInstruction;

  onPointerDown(e: FederatedPointerEvent) {
    return this.draw(e);
  }
  onPointerMove(e: FederatedPointerEvent) {
    return this.draw(e);
  }
  onPointerUp(e: FederatedPointerEvent) {}
  onPointerLeave(e: FederatedPointerEvent) {}
}
