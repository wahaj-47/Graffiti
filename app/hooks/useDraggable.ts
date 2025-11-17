import { useRef, useState } from "react";

export function useDraggable() {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLElement>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!nodeRef.current) return;

    offset.current = {
      x: e.clientX,
      y: e.clientY,
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const onPointerMove = (e: PointerEvent) => {
    setTransform({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
  };

  const onPointerUp = () => {
    setTransform({ x: 0, y: 0 });

    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  };

  const setNodeRef = (node: HTMLElement | null) => {
    nodeRef.current = node;
  };

  return {
    transform,
    setNodeRef,
    listeners: {
      onPointerDown,
    },
  };
}
