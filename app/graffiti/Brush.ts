import type { FederatedPointerEvent } from "pixi.js";
import type { Doc } from "yjs";
import type { Tool } from "./types";

export type BrushConfig = {
  color: string | number;
  radius: number;
};

export class Brush implements Tool {
  public color;
  public radius;

  constructor({ color, radius }: BrushConfig) {
    this.color = color;
    this.radius = radius;
  }

  onPointerDown(e: FederatedPointerEvent, doc: Doc) {}
  onPointerMove(e: FederatedPointerEvent, doc: Doc) {}
  onPointerUp(e: FederatedPointerEvent, doc: Doc) {}
}
