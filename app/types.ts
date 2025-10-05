import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

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
  Details: ComponentType;
}

export type ToolRendererProps = {
  index: number;
};
