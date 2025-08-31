import type { FederatedPointerEvent, PathInstruction } from "pixi.js";
import { Array, Map } from "yjs";
import { type Tool } from "~/types";

export type BrushConfig = {
  color: string | number;
  radius: number;
};

export abstract class Brush implements Tool {
  protected instructions: Array<unknown> | undefined;

  public id;
  public color;
  public radius;

  constructor({ color, radius }: BrushConfig) {
    this.instructions = new Array();

    this.id = "brush";
    this.color = color;
    this.radius = radius;
  }

  abstract onPointerDown(e: FederatedPointerEvent): Array<unknown>;
  abstract onPointerMove(e: FederatedPointerEvent): void;
  abstract onPointerUp(e: FederatedPointerEvent): void;
  abstract onPointerLeave(e: FederatedPointerEvent): void;
}
