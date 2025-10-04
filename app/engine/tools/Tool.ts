import type { FederatedPointerEvent } from "pixi.js";
import { Array, type Doc } from "yjs";
import type { ToolConfig } from "~/types";

export abstract class Tool<T extends ToolConfig> {
  id: T["id"];
  doc: Doc;
  instructions: Array<unknown>;

  static isPointerOver: boolean;
  static isPointerDown: boolean;

  constructor(doc: Doc) {
    this.doc = doc;
    this.id = "tool";
    this.instructions = new Array();
  }

  getId(): T["id"] {
    return this.id;
  }

  getConfig(): T {
    return { id: this.id } as T;
  }

  protected beginTransaction(e: FederatedPointerEvent): void {
    const history = this.doc.getArray("history");
    const instructions = this.doc.getArray("instructions");
    this.doc.transact(
      () => [history.push([this.getConfig()]), instructions.push([this.instructions])],
      this.doc.clientID,
    );
  }

  protected transact(instructions: unknown[]): void {
    this.doc.transact(() => {
      this.instructions.push(instructions);
    }, this.doc.clientID);
  }

  protected endTransaction(): void {
    this.instructions = new Array();
  }

  protected getLocalPosition(e: FederatedPointerEvent) {
    return e.getLocalPosition(e.target, e.global);
  }

  onPointerDown(e: FederatedPointerEvent): void {
    Tool.isPointerDown = true;
  }
  onPointerUp(e: FederatedPointerEvent): void {
    Tool.isPointerDown = false;
  }
  onPointerUpOutside(e: FederatedPointerEvent): void {
    Tool.isPointerDown = false;
  }
  onPointerMove(e: FederatedPointerEvent): void {}
  onPointerOver(e: FederatedPointerEvent): void {
    Tool.isPointerOver = true;
  }
  onPointerOut(e: FederatedPointerEvent): void {
    Tool.isPointerOver = false;
  }
  onPointerEnter(e: FederatedPointerEvent): void {}
  onPointerLeave(e: FederatedPointerEvent): void {}
  onPointerCancel(e: FederatedPointerEvent): void {}
  onPointerTap(e: FederatedPointerEvent): void {}
}
