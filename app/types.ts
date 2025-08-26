import type { FederatedPointerEvent } from "pixi.js";
import type { Array, Map } from "yjs";

export interface Tool {
  readonly id: string;
  onPointerDown(e: FederatedPointerEvent): Array<unknown>;
  onPointerMove(e: FederatedPointerEvent): void;
  onPointerUp(e: FederatedPointerEvent): void;
  onPointerLeave(e: FederatedPointerEvent): void;
}

export type BrushProps = {
  index: number;
};
