import type { FederatedPointerEvent, PathInstruction } from "pixi.js";
import type { Array, Map } from "yjs";

export type Command = Map<string | Array<unknown>>;

export interface Tool {
  readonly id: string;
  onPointerDown(e: FederatedPointerEvent): Command;
  onPointerMove(e: FederatedPointerEvent): void;
  onPointerUp(e: FederatedPointerEvent): void;
  onPointerLeave(e: FederatedPointerEvent): void;
}

export type BrushProps = {
  instructions: PathInstruction[];
};
