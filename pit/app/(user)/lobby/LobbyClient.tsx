"use client";

import { useCallback, useEffect, useState } from "react";
import { getLobbyState } from "./actions";
import type { LobbyState } from "./definitions";
import { LobbyBrowser } from "./LobbyBrowser";
import { LobbyRoom } from "./LobbyRoom";

export default function LobbyClient() {
  const [state, setState] = useState<LobbyState | null>(null);

  const refresh = useCallback(async () => {
    setState(await getLobbyState());
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (document.visibilityState !== "visible") return;
      const data = await getLobbyState();
      if (!cancelled) setState(data);
    }

    load();
    const interval = setInterval(load, 2000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (!state) return <p>Loading...</p>;

  if (state.lobby) {
    return (
      <LobbyRoom lobby={state.lobby} me={state.userId} onChange={refresh} />
    );
  }
  return <LobbyBrowser lobbies={state.publicLobbies} onChange={refresh} />;
}