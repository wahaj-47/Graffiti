import { useKeyPress } from "~/hooks/useKeys";
import type { ToolConfig, ToolDefinition } from "~/types";
import { PaintBrush } from "../tool/PaintBrush";
import { Eraser } from "../tool/Eraser";

export function Toolbar() {
  return (
    <div className="absolute left-px mt-2 ms-2 border border-zinc-600 rounded-sm">
      <ToolButton tool={PaintBrush}></ToolButton>
      <ToolButton tool={Eraser}></ToolButton>
    </div>
  );
}

type ToolButtonProps<T extends ToolConfig> = {
  tool: ToolDefinition<T>;
};

function ToolButton<T extends ToolConfig>({ tool }: ToolButtonProps<T>) {
  useKeyPress([tool.shortcut], (e) => {});

  return (
    <tool.Icon
      className="rounded-xs p-2 not-last:border-b divide-y-reverse border-zinc-600 text-white"
      size={40}
    ></tool.Icon>
  );
}
