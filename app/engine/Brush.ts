import type { FederatedPointerEvent, PathInstruction } from "pixi.js";
import { Array, Doc } from "yjs";
import { Tool } from "./Tool";
import type { ToolConfig } from "~/types";

export interface BrushConfig extends ToolConfig {
  color: string | number;
  radius: number;
}

export abstract class Brush extends Tool {
  color: string | number;
  radius: number;

  constructor(doc: Doc, config: Omit<BrushConfig, "id">) {
    super(doc);
    this.color = config.color;
    this.radius = config.radius;
  }

  getConfig(): BrushConfig {
    return {
      id: this.id,
      color: this.color,
      radius: this.radius,
    };
  }
}
