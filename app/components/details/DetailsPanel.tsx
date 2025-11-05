import { useTool } from "~/context/ToolContext";
import { getGProps } from "~/engine/decorators/GProperty";
import { Number } from "../property/Number";
import { Color } from "../property/Color";
import { Separator } from "../ui/separator";

export function DetailsPanel() {
  const { tool } = useTool();
  const properties = getGProps(tool);

  return (
    <div className="absolute h-screen right-0 space-y-2 bg-zinc-800 p-4">
      <h4>Properties</h4>
      <Separator></Separator>
      {properties.map((property, index) => {
        const { type, label } = property;
        switch (type) {
          case "number":
            return <Number key={index} min={0}></Number>;

          case "color":
            return <Color key={index}></Color>;

          default:
            return null;
        }
      })}
    </div>
  );
}
