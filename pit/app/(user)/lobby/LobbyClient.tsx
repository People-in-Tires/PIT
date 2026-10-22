"use client";

import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { getLobbyState } from "./actions";
import type { LobbyState } from "./definitions";
import { LobbyBrowser } from "./LobbyBrowser";
import { LobbyRoom } from "./LobbyRoom";
import { LobbyContext } from "@/context/lobby";
import { ViewManager } from "@/components/engine/ViewManager";
import Link from "next/link";

export default function LobbyClient() {
  const { raceID, setRaceID } = useContext(LobbyContext);
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
  useEffect(() => {
    if (state && raceID == -1 && state.lobby?.started)
      setRaceID(state.lobby.raceid);
  }, [state, raceID, setRaceID]);

  if (!state) return <p>Loading...</p>;
  console.log("lobby?.started", state.lobby?.started);
  console.log("lobby?.raceid", state.lobby?.raceid);
  console.log("raceID =>", raceID);
  if (raceID != -1 || state.lobby?.raceid != -1) {
    return <ViewManager initialView="garage" isLoggedIn={true} />;
  }
  if (state.lobby) {
    return (
      <div className="lobby-page">
        <Fragment>
          <h1>Lobby</h1>
          <p>
            <Link href="/">← Back to garage</Link>
          </p>
          <LobbyRoom lobby={state.lobby} me={state.userId} onChange={refresh} />
        </Fragment>
      </div>
    );
  }
  return (
    <div className="lobby-page">
      <h1>Lobby</h1>
      <p>
        <Link href="/">← Back to garage</Link>
      </p>
      <LobbyBrowser lobbies={state.publicLobbies} onChange={refresh} />
    </div>
  );
}
