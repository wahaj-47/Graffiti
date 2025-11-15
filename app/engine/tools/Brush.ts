import { Doc } from "yjs";
import { Tool } from "./Tool";
import type { ToolConfig } from "~/types";
import { GProperty } from "../decorators/GProperty";

export interface BrushConfig extends ToolConfig {
  color: string | number;
  radius: number;
}

export abstract class Brush<T extends BrushConfig> extends Tool<T> {
  constructor(doc: Doc, config: Omit<T, "id">) {
    super(doc, config);
  }

  @GProperty({ type: "color", label: "Color" })
  get color(): T["color"] {
    return this.config.color;
  }

  set color(value: T["color"]) {
    this.config.color = value;
    this.broadcast();
  }

  @GProperty({ type: "number", label: "Radius" })
  get radius(): T["radius"] {
    return this.config.radius;
  }

  set radius(value: T["radius"]) {
    this.config.radius = value;
    this.broadcast();
  }
}
