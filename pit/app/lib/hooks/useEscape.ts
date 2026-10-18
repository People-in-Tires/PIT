import { useEffect, useEffectEvent } from "react";

export function useEscape(onEscape: () => void, active: boolean = true) {
  const handleEscape = useEffectEvent(onEscape);

  useEffect(() => {
    if (!active) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleEscape();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);
}
