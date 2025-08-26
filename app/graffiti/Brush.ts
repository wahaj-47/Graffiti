import type { FederatedPointerEvent, PathInstruction } from "pixi.js";
import { Array, Map } from "yjs";
import { type Tool } from "~/types";

export type BrushConfig = {
  color: string | number;
  radius: number;
};

export abstract class Brush implements Tool {
  private instructions: Array<unknown> | undefined;

  public id;
  public color;
  public radius;

  constructor({ color, radius }: BrushConfig) {
    this.instructions = new Array();

    this.id = "brush";
    this.color = color;
    this.radius = radius;
  }

  abstract draw(e: FederatedPointerEvent): PathInstruction;

  onPointerDown(e: FederatedPointerEvent): Array<unknown> {
    this.instructions = new Array();
    this.instructions.push([this.draw(e)]);
    return this.instructions;
  }

  onPointerMove(e: FederatedPointerEvent) {
    if (this.instructions) {
      this.instructions.push([this.draw(e)]);
    }
  }

  onPointerUp(e: FederatedPointerEvent) {
    this.instructions = undefined;
  }

  onPointerLeave(e: FederatedPointerEvent) {
    this.instructions = undefined;
  }
}
