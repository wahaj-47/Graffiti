import { useRef, useState } from "react";

export function useDraggable() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    offset.current = {
      x: e.clientX,
      y: e.clientY,
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const onPointerMove = (e: PointerEvent) => {
    setDelta({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
  };

  const onPointerUp = (e: PointerEvent) => {
    setPosition((prev) => ({ x: prev.x + e.clientX - offset.current.x, y: prev.y + e.clientY - offset.current.y }));
    setDelta({ x: 0, y: 0 });

    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  };

  const transform = {
    x: position.x + delta.x,
    y: position.y + delta.y,
  };

  return {
    transform,
    listeners: {
      onPointerDown,
    },
  };
}
