import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import type { Tool } from "./engine/tools/Tool";
import type { Doc } from "yjs";

export interface ToolConfig {
  id: string;
}

export interface ToolDefinition<T extends ToolConfig> {
  id: T["id"];
  name: string;
  defaultConfig: Omit<T, "id">;
  shortcut: string;
  Icon: ComponentType<LucideProps>;
  Renderer: ComponentType<ToolRendererProps>;
  Details: ComponentType<ToolDetailsProps>;
  Engine: new (doc: Doc, config: T) => Tool<T>;
}

export type ToolRendererProps = {
  index: number;
};

export type ToolDetailsProps = {};
