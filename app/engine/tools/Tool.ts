import type { FederatedPointerEvent } from "pixi.js";
import { Array, type Doc } from "yjs";
import type { ToolConfig } from "~/types";

export abstract class Tool {
  id: string;
  doc: Doc;
  instructions: Array<unknown>;

  protected isPointerOver: boolean;
  protected isPointerDown: boolean;

  constructor(doc: Doc) {
    this.id = "tool";
    this.doc = doc;
    this.instructions = new Array();

    this.isPointerOver = false;
    this.isPointerDown = false;
  }

  getId(): string {
    return this.id;
  }

  getConfig(): ToolConfig {
    return { id: this.id };
  }

  protected beginTransaction(e: FederatedPointerEvent): void {
    const history = this.doc.getArray("history");
    const instructions = this.doc.getArray("instructions");
    this.doc.transact(() => [history.push([this.getConfig()]), instructions.push([this.instructions])]);
  }

  protected endTransaction(): void {
    this.instructions = new Array();
  }

  onPointerDown(e: FederatedPointerEvent): void {
    this.isPointerDown = true;
  }
  onPointerUp(e: FederatedPointerEvent): void {
    this.isPointerDown = false;
  }
  onPointerUpOutside(e: FederatedPointerEvent): void {
    this.isPointerDown = false;
  }
  onPointerMove(e: FederatedPointerEvent): void {}
  onPointerOver(e: FederatedPointerEvent): void {
    this.isPointerOver = true;
  }
  onPointerOut(e: FederatedPointerEvent): void {
    this.isPointerOver = false;
  }
  onPointerEnter(e: FederatedPointerEvent): void {}
  onPointerLeave(e: FederatedPointerEvent): void {}
  onPointerCancel(e: FederatedPointerEvent): void {}
  onPointerTap(e: FederatedPointerEvent): void {}
}
