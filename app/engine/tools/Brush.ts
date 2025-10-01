import { Doc } from "yjs";
import { Tool } from "./Tool";
import type { ToolConfig } from "~/types";

export interface BrushConfig extends ToolConfig {
  color: string | number;
  radius: number;
}

export abstract class Brush extends Tool {
  constructor(doc: Doc, config: Omit<BrushConfig, "id">) {
    super(doc);
    this.config.set("color", config.color);
    this.config.set("radius", config.radius);
  }
}
