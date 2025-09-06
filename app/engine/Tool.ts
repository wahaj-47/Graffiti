import type { FederatedPointerEvent } from "pixi.js";
import { Array, type Doc } from "yjs";
import type { ToolConfig } from "~/types";

export abstract class Tool {
  id: string = "tool";
  doc: Doc;
  instructions: Array<unknown>;

  constructor(doc: Doc) {
    this.doc = doc;
    this.instructions = new Array();
  }

  getId(): string {
    return this.id;
  }

  getConfig(): ToolConfig {
    return { id: this.id };
  }

  onPointerDown(e: FederatedPointerEvent): void {
    const history = this.doc.getArray("history");
    const instructions = this.doc.getArray("instructions");
    this.doc.transact(() => [
      history.push([this.getConfig(), instructions.push([this.instructions])]),
    ]);
  }

  abstract onPointerMove(e: FederatedPointerEvent): void;
  abstract onPointerUp(e: FederatedPointerEvent): void;
  abstract onPointerLeave(e: FederatedPointerEvent): void;
}
