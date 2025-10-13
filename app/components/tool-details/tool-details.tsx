import { useTool } from "~/context/ToolContext";
import { getToolDefinitionById } from "../tool";
import { getGProps } from "~/engine/decorators/GProperty";

export function ToolDetails() {
  const { tool } = useTool();
  console.log(getGProps(tool));

  const definition = getToolDefinitionById(tool.id);

  if (!definition?.Details) return null;

  const Details = definition.Details;
  return (
    <div className="absolute m-2 right-0 bottom-0">
      <Details />
    </div>
  );
}
