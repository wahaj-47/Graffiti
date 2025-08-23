import type { FederatedPointerEvent, PathInstruction } from "pixi.js";
import type { Array } from "yjs";

export type Command = {
  tool: string;
  instructions: Array<unknown>;
};

export interface Tool {
  readonly id: string;
  onPointerDown(e: FederatedPointerEvent): unknown;
  onPointerMove(e: FederatedPointerEvent): unknown;
  onPointerUp(e: FederatedPointerEvent): void;
  onPointerLeave(e: FederatedPointerEvent): void;
}

export type BrushProps = {
  instructions: PathInstruction[];
};
