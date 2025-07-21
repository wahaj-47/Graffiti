import { useEffect, useRef } from "react";
import { Doc, Map as YMap, Array as YArray } from "yjs";
import { WebsocketProvider } from "y-websocket";
import paper from "paper";
import { v4 as uuidv4 } from "uuid";

export function Artboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const remotePathsRef = useRef<Map<string, paper.Path>>(new Map()); // id -> paper.Path

  useEffect(() => {
    if (canvasRef.current) paper.setup(canvasRef.current);

    const ydoc = new Doc();

    const provider = new WebsocketProvider(
      "ws://localhost:3000",
      "drawing-room",
      ydoc
    );

    // Each stroke is a Y.Map: { id, color, width, points: Y.Array }
    const yPaths = ydoc.getMap();

    // Observe new paths added
    yPaths.observe((event) => {
      event.changes.keys.forEach((change, key) => {
        if (change.action === "add") {
          const yStroke = yPaths.get(key);
          createRemotePath(yStroke);
        }
      });
    });

    // Add listener for new points on existing paths
    function createRemotePath(yStroke) {
      const color = yStroke.get("color");
      const width = yStroke.get("width");
      const points = yStroke.get("points");
      const path = new paper.Path({
        strokeColor: color,
        strokeWidth: width,
      });
      remotePathsRef.current.set(yStroke.get("id"), path);

      // Add existing points
      points.toArray().forEach(([x, y]) => path.add(new paper.Point(x, y)));

      // Listen for new points
      points.observe((event) => {
        event.changes.added.forEach((item) => {
          item.content.getContent().forEach(([x, y]) => {
            path.add(new paper.Point(x, y));
            paper.view.update();
          });
        });
      });
    }

    let currentPath = null;
    let currentPoints = null;

    paper.view.onMouseDown = (event) => {
      const id = uuidv4();
      currentPath = new paper.Path({
        strokeColor: "#00aeff",
        strokeWidth: 3,
      });
      currentPath.add(event.point);

      // Add new Y.Map for this path
      const yStroke = new YMap();
      yStroke.set("id", id);
      yStroke.set("color", "#00aeff");
      yStroke.set("width", 3);
      const yPoints = new YArray();
      yPoints.push([[event.point.x, event.point.y]]);
      yStroke.set("points", yPoints);

      yPaths.set(id, yStroke);
      currentPoints = yPoints;
    };

    paper.view.onMouseDrag = (event) => {
      currentPath.add(event.point);
      currentPoints.push([[event.point.x, event.point.y]]);
    };

    paper.view.onMouseUp = () => {
      currentPath = null;
      currentPoints = null;
    };

    return () => {
      paper.view.onMouseDown = null;
      paper.view.onMouseDrag = null;
      paper.view.onMouseUp = null;
      provider.destroy();
      ydoc.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-white w-full h-full" />;
}
