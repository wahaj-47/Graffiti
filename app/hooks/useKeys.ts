import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

type Key = KeyboardEvent["key"];

export function useKeyPress(combinations: Key[], callback: (event: KeyboardEvent) => void, node?: HTMLElement) {
  // Keep the callback updated
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const pressed = [];
      if (event.ctrlKey) pressed.push("ctrl");
      if (event.shiftKey) pressed.push("shift");
      if (event.altKey) pressed.push("alt");
      if (event.metaKey) pressed.push("meta");
      pressed.push(event.key.toLowerCase());
      const curr = pressed.join("+");

      if (combinations.some((combo) => combo === curr)) {
        callbackRef.current(event);
      }
    },
    [combinations],
  );

  useEffect(() => {
    const targetNode: HTMLElement | Document = node ?? document;

    targetNode.addEventListener("keydown", handleKeyDown as EventListener);

    return () => {
      targetNode.removeEventListener("keydown", handleKeyDown as EventListener);
    };
  }, [handleKeyDown, node]);
}
