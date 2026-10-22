"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { createLobby, joinPrivateLobby, joinPublicLobby } from "./actions";
import type { LobbyListItem } from "./definitions";

type Props = {
  lobbies: LobbyListItem[];
  onChange: () => Promise<void>;
};

export function LobbyBrowser({ lobbies, onChange }: Props) {
  return (
    <>
      <CreateLobby onChange={onChange} />
      <JoinPrivate onChange={onChange} />
      <PublicLobbies lobbies={lobbies} onChange={onChange} />
    </>
  );
}

function CreateLobby({ onChange }: { onChange: () => Promise<void> }) {
  const [state, formAction, pending] = useActionState(createLobby, undefined);
  const [visibility, setVisibility] = useState("public");

  useEffect(() => {
    if (state?.timestamp) onChange();
  }, [state?.timestamp, onChange]);

  return (
    <section>
      <h2>Create a lobby</h2>
      <form action={formAction} className="lobby-form">
        <div>
          <label htmlFor="create-name">Name: </label>
          <input
            id="create-name"
            name="name"
            autoComplete="off"
            maxLength={30}
            defaultValue={state?.values?.name ?? ""}
          />
        </div>
        {state?.errors?.name && <p className="error">{state.errors.name[0]}</p>}

        <div>
          <label htmlFor="create-max">Max players: </label>
          <input
            id="create-max"
            name="maxPlayers"
            type="number"
            min={1}
            max={12}
            defaultValue={state?.values?.maxPlayers ?? "12"}
          />
        </div>
        {state?.errors?.maxPlayers && (
          <p className="error">{state.errors.maxPlayers[0]}</p>
        )}

        <div>
          <label htmlFor="create-visibility">Visibility: </label>
          <select
            id="create-visibility"
            name="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private (password)</option>
          </select>
        </div>

        {visibility === "private" && (
          <div>
            <label htmlFor="create-password">Password: </label>
            <input
              id="create-password"
              name="password"
              type="password"
              autoComplete="new-password"
            />
          </div>
        )}
        {state?.errors?.password && (
          <p className="error">{state.errors.password[0]}</p>
        )}

        <div className="lobby-checkbox">
          <input
            id="create-cpu"
            name="cpuTeams"
            type="checkbox"
            defaultChecked={state?.values?.cpuTeams}
          />
          <label htmlFor="create-cpu">CPU teams participate</label>
        </div>

        {state?.message && <p className="error">{state.message}</p>}
        <button type="submit" disabled={pending}>
          {pending ? "Creating..." : "Create lobby"}
        </button>
      </form>
    </section>
  );
}

function JoinPrivate({ onChange }: { onChange: () => Promise<void> }) {
  const [state, formAction, pending] = useActionState(
    joinPrivateLobby,
    undefined,
  );

  useEffect(() => {
    if (state?.timestamp) onChange();
  }, [state?.timestamp, onChange]);

  return (
    <section>
      <h2>Join a private lobby</h2>
      <form action={formAction} className="lobby-form">
        <div>
          <label htmlFor="join-name">Name: </label>
          <input
            id="join-name"
            name="name"
            autoComplete="off"
            defaultValue={state?.values?.name ?? ""}
          />
        </div>
        <div>
          <label htmlFor="join-password">Password: </label>
          <input id="join-password" name="password" type="password" />
        </div>
        {state?.message && <p className="error">{state.message}</p>}
        <button type="submit" disabled={pending}>
          {pending ? "Joining..." : "Join"}
        </button>
      </form>
    </section>
  );
}

function PublicLobbies({ lobbies, onChange }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function join(id: string) {
    startTransition(async () => {
      const result = await joinPublicLobby(id);
      setError(result.error ?? null);
      await onChange();
    });
  }

  return (
    <section>
      <h2>Public lobbies</h2>
      {error && <p className="error">{error}</p>}
      {lobbies.length === 0 ? (
        <p>No public lobbies right now. Create one!</p>
      ) : (
        <ul className="lobby-list">
          {lobbies.map((lobby) => {
            const full = lobby.playerCount >= lobby.maxPlayers;
            return (
              <li key={lobby.id} className="lobby-item">
                <div>
                  <strong>{lobby.name}</strong>
                  <div className="lobby-meta">
                    Leader: {lobby.leaderName} · {lobby.playerCount}/
                    {lobby.maxPlayers} players
                    {lobby.cpuTeams ? " · CPU teams" : ""}
                  </div>
                </div>
                <button
                  type="button"
                  disabled={full || pending}
                  onClick={() => join(lobby.id)}
                >
                  {full ? "Full" : "Join"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
