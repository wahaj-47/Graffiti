import { useTool } from "~/context/ToolContext";
import { getGProps } from "~/engine/decorators/GProperty";
import { Number } from "../property/Number";
import { Color } from "../property/Color";

export function DetailsPanel() {
  const { tool } = useTool();
  const properties = getGProps(tool);

  return (
    <div className="absolute m-2 right-0 bottom-0">
      {properties.map((property, index) => {
        const { type, label } = property;
        switch (type) {
          case "number":
            return <Number key={index}></Number>;

          case "color":
            return <Color key={index}></Color>;

          default:
            return null;
        }
      })}
    </div>
  );
}
