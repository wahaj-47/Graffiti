import type { FederatedPointerEvent } from "pixi.js";
import type { Array, Map } from "yjs";

export interface ToolConfig {
  id: string;
}

export interface Tool {
  readonly id: string;
  getConfig(): ToolConfig;
  onPointerDown(e: FederatedPointerEvent): Array<unknown>;
  onPointerMove(e: FederatedPointerEvent): void;
  onPointerUp(e: FederatedPointerEvent): void;
  onPointerLeave(e: FederatedPointerEvent): void;
}

export type BrushProps = {
  index: number;
};
