import type { FederatedPointerEvent } from "pixi.js";
import { Array, type Doc } from "yjs";
import type { ToolConfig } from "~/types";

export abstract class Tool {
  id: string;
  doc: Doc;
  instructions: Array<unknown>;
  active: boolean;
  canActivate: boolean;

  constructor(doc: Doc) {
    this.id = "tool";
    this.doc = doc;
    this.instructions = new Array();
    this.active = false;
    this.canActivate = false;
  }

  getId(): string {
    return this.id;
  }

  getConfig(): ToolConfig {
    return { id: this.id };
  }

  protected setActive(active: boolean) {
    this.active = active;
  }

  protected setCanActivate(canActivate: boolean) {
    this.canActivate = canActivate;
  }

  protected createTransaction(): void {
    const history = this.doc.getArray("history");
    const instructions = this.doc.getArray("instructions");
    this.doc.transact(() => [history.push([this.getConfig()]), instructions.push([this.instructions])]);
  }

  protected reset(): void {
    this.instructions = new Array();
  }

  onPointerDown(e: FederatedPointerEvent): void {}
  onPointerUp(e: FederatedPointerEvent): void {}
  onPointerUpOutside(e: FederatedPointerEvent): void {}
  onPointerMove(e: FederatedPointerEvent): void {}
  onPointerOver(e: FederatedPointerEvent): void {}
  onPointerOut(e: FederatedPointerEvent): void {}
  onPointerEnter(e: FederatedPointerEvent): void {}
  onPointerLeave(e: FederatedPointerEvent): void {}
  onPointerCancel(e: FederatedPointerEvent): void {}
  onPointerTap(e: FederatedPointerEvent): void {}
}
