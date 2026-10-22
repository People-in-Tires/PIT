"use client";

import { useEffect } from "react";
import { heartbeat } from "./actions";
import { HEARTBEAT_INTERVAL_MS } from "./online";

export function Heartbeat() {
  useEffect(() => {
    heartbeat();

    const id = setInterval(() => {
      if (document.visibilityState === "visible") heartbeat(); // achtergrond en geminimaliseerd tabbald = offline
    }, HEARTBEAT_INTERVAL_MS);

    return () => clearInterval(id);
  }, []);

  return null;
}
