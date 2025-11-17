import { useTool } from "~/context/ToolContext";
import { getGProps, type GPropertySpecifiers } from "~/engine/decorators/GProperty";
import { Number } from "../property/Number";
import { Color } from "../property/Color";
import { Separator } from "../ui/separator";
import type { Tool } from "~/engine/tools";
import { useRef, useSyncExternalStore } from "react";
import { GripVertical } from "lucide-react";
import { useDraggable } from "~/hooks/useDraggable";

function Property(props: GPropertySpecifiers<Tool<any>, keyof Tool<any>>) {
  const { tool } = useTool();
  const { type, label, get, set } = props;
  const value = useSyncExternalStore(tool.subscribe.bind(tool), get);

  switch (type) {
    case "number":
      return <Number key={label} min={0} value={value} onChange={(e) => set(e.target.value)} />;

    case "color":
      return <Color key={label} value={value} onChange={(value) => set(value)} />;

    default:
      return null;
  }
}

export function DetailsPanel() {
  const { tool } = useTool();
  const properties = getGProps(tool);
  const { transform, listeners } = useDraggable();

  const style = {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
  };

  return (
    <div className="absolute top-2 right-2 space-y-2 bg-zinc-800 p-4 rounded-md" style={style}>
      <div className="flex justify-between">
        <h4>Properties</h4>
        <GripVertical className="cursor-grab" {...listeners} />
      </div>
      <Separator></Separator>
      {properties.map((property, index) => (
        <Property key={index} {...property} />
      ))}
    </div>
  );
}
