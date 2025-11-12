import type { FederatedPointerEvent } from "pixi.js";
import { Array, type Doc } from "yjs";
import type { Listener, ToolConfig } from "~/types";

export abstract class Tool<T extends ToolConfig> {
  abstract readonly id: T["id"];
  protected config: T;
  private doc: Doc;
  private instructions: Array<unknown>;
  private listeners: Set<Listener>;

  static isPointerOver: boolean;
  static isPointerDown: boolean;

  constructor(doc: Doc, config: Omit<T, "id">) {
    this.doc = doc;
    this.config = config as T;
    this.instructions = new Array();
    this.listeners = new Set();
  }

  subscribe(fn: Listener): () => boolean {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  protected broadcast(): void {
    this.listeners.forEach((fn) => fn());
  }

  getConfig(): T {
    this.config.id = this.id;
    return this.config;
  }

  setConfig(config: T): void {
    Object.assign(this.config, config);
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
