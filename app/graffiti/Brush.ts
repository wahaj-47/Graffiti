import type { FederatedPointerEvent, PathInstruction } from "pixi.js";
import { Array, Map } from "yjs";
import { type Command, type Tool } from "~/types";

export type BrushConfig = {
  color: string | number;
  radius: number;
};

export abstract class Brush implements Tool {
  private instructions: Array<unknown>;
  private active: boolean;

  public id;
  public color;
  public radius;

  constructor({ color, radius }: BrushConfig) {
    this.active = false;
    this.instructions = new Array();

    this.id = "brush";
    this.color = color;
    this.radius = radius;
  }

  abstract draw(e: FederatedPointerEvent): PathInstruction;

  onPointerDown(e: FederatedPointerEvent): Command {
    this.active = true;
    const command = new Map();
    command.set("tool", this.id);
    command.set("instructions", this.instructions);
    this.instructions.push([this.draw(e)]);
    return command as Command;
  }
  onPointerMove(e: FederatedPointerEvent) {
    if (this.active) this.instructions.push([this.draw(e)]);
  }
  onPointerUp(e: FederatedPointerEvent) {
    this.active = false;
    this.instructions = new Array();
  }
  onPointerLeave(e: FederatedPointerEvent) {
    this.active = false;
    this.instructions = new Array();
  }
}
