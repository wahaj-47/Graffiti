import { Doc } from "yjs";
import { Tool } from "./Tool";
import type { ToolConfig } from "~/types";

export interface BrushConfig extends ToolConfig {
  color: string | number;
  radius: number;
}

export abstract class Brush<T extends BrushConfig> extends Tool<T> {
  constructor(doc: Doc, config: Omit<T, "id">) {
    super(doc, config);
  }

  get color(): T["color"] {
    return this.config.color;
  }

  set color(value: T["color"]) {
    this.config.color = value;
  }

  get radius(): T["radius"] {
    return this.config.radius;
  }

  set radius(value: T["radius"]) {
    this.config.radius = value;
  }
}
