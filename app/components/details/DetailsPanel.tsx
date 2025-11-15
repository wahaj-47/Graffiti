import { useTool } from "~/context/ToolContext";
import { getGProps, type GPropertySpecifiers } from "~/engine/decorators/GProperty";
import { Number } from "../property/Number";
import { Color } from "../property/Color";
import { Separator } from "../ui/separator";
import type { Tool } from "~/engine/tools";
import { useSyncExternalStore } from "react";

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

  return (
    <div className="absolute h-screen right-0 space-y-2 bg-zinc-800 p-4">
      <h4>Properties</h4>
      <Separator></Separator>
      {properties.map((property, index) => (
        <Property key={index} {...property} />
      ))}
    </div>
  );
}
