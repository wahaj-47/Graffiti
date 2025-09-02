import type { FederatedPointerEvent, PathInstruction } from "pixi.js";
import { Array } from "yjs";
import { type Tool, type ToolConfig } from "~/types";

export interface BrushConfig extends ToolConfig {
  color: string | number;
  radius: number;
}

export abstract class Brush implements Tool {
  protected instructions: Array<unknown> | undefined;

  public id;
  public color;
  public radius;

  constructor({ color, radius }: Omit<BrushConfig, "id">) {
    this.instructions = new Array();

    this.id = "brush";
    this.color = color;
    this.radius = radius;
  }

  abstract getConfig(): BrushConfig;
  abstract onPointerDown(e: FederatedPointerEvent): Array<unknown>;
  abstract onPointerMove(e: FederatedPointerEvent): void;
  abstract onPointerUp(e: FederatedPointerEvent): void;
  abstract onPointerLeave(e: FederatedPointerEvent): void;
}
