import { useKeyPress } from "~/hooks/useKeys";
import type { ToolConfig, ToolDefinition } from "~/types";
import { PaintBrush } from "../tool/PaintBrush";
import { Eraser } from "../tool/Eraser";
import { Toggle } from "../ui/toggle";

export function Toolbar() {
  return (
    <div className="absolute m-2 flex flex-col">
      <ToolButton tool={PaintBrush}></ToolButton>
      <ToolButton tool={Eraser}></ToolButton>
    </div>
  );
}

type ToolButtonProps<T extends ToolConfig> = {
  tool: ToolDefinition<T>;
};

function ToolButton<T extends ToolConfig>({ tool }: ToolButtonProps<T>) {
  useKeyPress([tool.shortcut], () => {
    // Set active tool in context
    // setTool(new tool.Engine(doc, tool.defaultConfig))
  });

  return (
    <Toggle
      value={tool.id}
      aria-label={`Toggle ${tool.name} tool`}
      className="m-1 text-muted data-[state=on]:text-primary"
    >
      <tool.Icon></tool.Icon>
    </Toggle>
  );
}
