import { useKeyPress } from "~/hooks/useKeys";
import type { ToolConfig, ToolDefinition } from "~/types";
import { PaintBrush, Eraser } from "../tool";
import { Toggle } from "../ui/toggle";
import { useTool } from "~/context/ToolContext";
import { useYDoc } from "~/context/YContext";

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
  const doc = useYDoc();
  const { tool: activeTool, setTool } = useTool();

  const onPressed = () => {
    setTool(new tool.Engine(doc, tool.defaultConfig));
  };

  useKeyPress([tool.shortcut], onPressed);

  return (
    <Toggle
      pressed={tool.id == activeTool.id}
      onPressedChange={onPressed}
      value={tool.id}
      aria-label={`Toggle ${tool.name} tool`}
      className="m-1 text-muted data-[state=on]:text-primary"
    >
      <tool.Icon></tool.Icon>
    </Toggle>
  );
}
