import type { FederatedPointerEvent } from "pixi.js";
import { Array, Map, type Doc } from "yjs";
import type { ToolConfig } from "~/types";

export abstract class Tool {
  doc: Doc;
  config: Map<unknown>;
  instructions: Array<unknown>;

  static isPointerOver: boolean;
  static isPointerDown: boolean;

  constructor(doc: Doc) {
    this.doc = doc;
    this.config = new Map();
    this.instructions = new Array();

    this.config.set("id", "tool");
  }

  getId(): string {
    return this.config.get("id") as string;
  }

  protected beginTransaction(e: FederatedPointerEvent): void {
    console.log("Begin transaction");
    const history = this.doc.getArray("history");
    const instructions = this.doc.getArray("instructions");
    this.doc.transact(() => [history.push([this.config]), instructions.push([this.instructions])], this.doc.clientID);
  }

  protected transact(instructions: unknown[]): void {
    this.doc.transact(() => {
      this.instructions.push(instructions);
    }, this.doc.clientID);
  }

  protected endTransaction(): void {
    this.config.set("dirty", false);

    this.config = this.config.clone();
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
