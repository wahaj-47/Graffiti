import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

type Key = KeyboardEvent["key"];

export function useKeyPress(
  combinations: Key[],
  onKeyDown: (event: KeyboardEvent) => void,
  onKeyUp?: (event: KeyboardEvent) => void,
  node?: HTMLElement,
) {
  // Keep the callback updated
  const onKeyDownRef = useRef(onKeyDown);
  const onKeyUpRef = useRef(onKeyUp);

  useLayoutEffect(() => {
    onKeyDownRef.current = onKeyDown;
  }, [onKeyDown]);

  useLayoutEffect(() => {
    onKeyUpRef.current = onKeyUp;
  }, [onKeyUp]);

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
        onKeyDownRef.current(event);
      }
    },
    [combinations],
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const released = [];
      if (event.ctrlKey) released.push("ctrl");
      if (event.shiftKey) released.push("shift");
      if (event.altKey) released.push("alt");
      if (event.metaKey) released.push("meta");
      released.push(event.key.toLowerCase());
      const curr = released.join("+");

      if (onKeyUpRef.current && combinations.some((combo) => combo === curr)) {
        onKeyUpRef.current(event);
      }
    },
    [combinations],
  );

  useEffect(() => {
    const targetNode: HTMLElement | Document = node ?? document;

    targetNode.addEventListener("keydown", handleKeyDown as EventListener);
    targetNode.addEventListener("keyup", handleKeyUp as EventListener);

    return () => {
      targetNode.removeEventListener("keydown", handleKeyDown as EventListener);
      targetNode.removeEventListener("keyup", handleKeyUp as EventListener);
    };
  }, [handleKeyDown, node]);
}
