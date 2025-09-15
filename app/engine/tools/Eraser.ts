import { Doc } from "yjs";
import { Tool } from "./Tool";
import type { ToolConfig } from "~/types";
import type { FederatedPointerEvent, PathInstruction } from "pixi.js";

export interface EraserConfig extends ToolConfig {
  radius: number;
}

export class Eraser extends Tool {
  radius: number;

  constructor(doc: Doc, config: Omit<EraserConfig, "id">) {
    super(doc);
    this.id = "eraser";
    this.radius = config.radius;
  }

  getConfig(): EraserConfig {
    return {
      id: this.id,
      radius: this.radius,
    };
  }

  protected beginTransaction(e: FederatedPointerEvent): void {
    super.beginTransaction(e);

    const { x, y } = this.getLocalPosition(e);
    const instructions: PathInstruction[] = [
      {
        action: "moveTo",
        data: [x, y],
      },
    ];

    this.transact(instructions);
  }

  onPointerDown(e: FederatedPointerEvent): void {
    super.onPointerDown(e);
    this.beginTransaction(e);
  }

  onPointerMove(e: FederatedPointerEvent): void {
    console.log(Tool.isPointerOver);
    if (!Tool.isPointerDown || !Tool.isPointerOver) return;

    const { x, y } = this.getLocalPosition(e);
    const instructions: PathInstruction[] = [
      {
        action: "lineTo",
        data: [x, y],
      },
    ];

    this.transact(instructions);
  }

  onPointerUp(e: FederatedPointerEvent): void {
    super.onPointerUp(e);
    this.endTransaction();
  }

  onPointerUpOutside(e: FederatedPointerEvent): void {
    super.onPointerUpOutside(e);
    this.endTransaction();
  }

  onPointerLeave(e: FederatedPointerEvent): void {
    super.onPointerLeave(e);
    if (Tool.isPointerDown) this.endTransaction();
  }

  onPointerEnter(e: FederatedPointerEvent): void {
    super.onPointerEnter(e);
    if (Tool.isPointerDown) this.beginTransaction(e);
  }

  onPointerTap(e: FederatedPointerEvent): void {
    super.onPointerTap(e);
    super.beginTransaction(e);

    const { x, y } = this.getLocalPosition(e);
    const instructions: PathInstruction[] = [
      {
        action: "circle",
        data: [x, y, this.radius / 64],
      },
    ];

    this.transact(instructions);
    this.endTransaction();
  }
}
