import { createContext, useContext, useState, type PropsWithChildren } from "react";
import { PaintBrush } from "~/engine/tools/PaintBrush";
import type { Tool } from "~/engine/tools/Tool";
import type { ToolConfig } from "~/types";
import { useYDoc } from "./YContext";

type ToolContextType = {
  tool: Tool<ToolConfig>;
};
type ToolProviderType = {};
type ToolProviderProps = PropsWithChildren<ToolProviderType>;

const ToolContext = createContext<ToolContextType | null>(null);

export function ToolProvider({ children }: ToolProviderProps) {
  const doc = useYDoc();
  const [tool, setTool] = useState<Tool<ToolConfig>>(new PaintBrush(doc, { color: "red", radius: 10 }));

  return <ToolContext.Provider value={{ tool }}>{children}</ToolContext.Provider>;
}

export const useTool = () => {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error("Tool hooks must be used within a HocuspocusProvider");
  }
  return context.tool;
};
