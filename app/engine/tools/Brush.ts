import { Doc } from "yjs";
import { Tool } from "./Tool";
import type { ToolConfig } from "~/types";

export interface BrushConfig extends ToolConfig {
  color: string | number;
  radius: number;
}

export abstract class Brush<T extends BrushConfig> extends Tool<T> {
  color: string | number;
  radius: number;

  constructor(doc: Doc, config: Omit<BrushConfig, "id">) {
    super(doc);
    this.color = config.color;
    this.radius = config.radius;
  }

  getConfig(): T {
    const config = super.getConfig();
    config.color = this.color;
    config.radius = this.radius;

    return config;
  }
}
