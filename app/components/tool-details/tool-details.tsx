import { useTool } from "~/context/ToolContext";
import { getGProps } from "~/engine/decorators/GProperty";

export function ToolDetails() {
  const { tool } = useTool();

  return <div className="absolute m-2 right-0 bottom-0"></div>;
}
