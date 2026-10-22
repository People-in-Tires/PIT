"use client";

import "../profile/profile.css";

import {
  useActionState,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  kickPlayer,
  leaveLobby,
  sendFriendRequest,
  toggleReady,
  updateRaceid,
  updateSettings,
} from "./actions";
import type { ActionResult, LobbyMemberView, LobbyView } from "./definitions";
import { Avatar } from "@/app/components/ui/Avatar";
import {
  createRace,
  IPoint,
  IRaceCreation,
  IRacerMeta,
} from "@/lib/race/actions";
import RaceCreator, {
  defaultRaceCreationData,
} from "@/components/raceCreator/RaceCreator";
import { redirect } from "next/navigation";
import {
  ConcreteManufacturer,
  ConcreteSponsor,
  Point,
  Race,
  Racer,
} from "@/lib/wasm/simulation";
import { LobbyContext } from "@/context/lobby";

type Props = {
  lobby: LobbyView;
  me: string;
  onChange: () => Promise<void>;
};

function createTrack(points: IPoint[]): Point[] {
  if (points.length != 8) throw RangeError;
  const rv: Point[] = points.map((point) => new Point(point.x, point.y));
  rv.concat(points.slice(0, 3).map((point) => new Point(point.x, point.y)));
  return rv;
}
function createRacer({
  manufacturer,
  sponsor,
  forename,
  surname,
  cpu,
}: IRacerMeta): Racer {
  const car = new ConcreteManufacturer(manufacturer).manufacture_car();
  const driver = new ConcreteSponsor(sponsor).scout();
  if (forename != "") driver.set_forename(forename);
  if (surname != "") driver.set_surname(surname);
  const racer = new Racer(0, 0);
  racer.driver = driver;
  racer.car = car;
  racer.cpu_pit = cpu;
  return racer;
}

export function LobbyRoom({ lobby, me, onChange }: Props) {
  const isLeader = lobby.leaderId === me;
  const myMember = lobby.members.find((m) => m.userId === me);
  const allReady = lobby.members.every((m) => m.ready);
  const started = lobby.started;
  const id = lobby.id;

  const { raceID, setRaceID } = useContext(LobbyContext);

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [raceData, setRaceData] = useState<IRaceCreation>(
    defaultRaceCreationData(),
  );

  function run(action: () => Promise<ActionResult>) {
    startTransition(async () => {
      const result = await action();
      setError(result.error ?? null);
      await onChange();
    });
  }
  async function startMatch() {
    const race = new Race(
      raceData.racers.map(createRacer),
      createTrack(raceData.track),
      raceData.weather,
    );
    const raceID = await createRace(race.to_json());
    setRaceID(raceID);
    updateRaceid(raceID);
  }
  function moveToGame() {
    setRaceID(raceID);
  }
  if (started) {
    moveToGame();
  }

  return (
    <div className="overflow-y-scroll">
      <section>
        <h2>{lobby.name}</h2>
        <p>
          <span className="badge">{lobby.isPublic ? "Public" : "Private"}</span>{" "}
          <span className="badge">
            {lobby.members.length}/{lobby.maxPlayers} players
          </span>
        </p>
        {error && <p className="error">{error}</p>}
      </section>

      {isLeader ? (
        <SettingsForm
          lobby={lobby}
          onChange={onChange}
          raceData={raceData}
          setRaceData={setRaceData}
        />
      ) : (
        <section>
          <h2>Settings</h2>
          <ul className="lobby-settings">
            <li>Visibility: {lobby.isPublic ? "Public" : "Private"}</li>
            <li>Max players: {lobby.maxPlayers}</li>
            <li>CPU teams: {lobby.cpuTeams ? "Yes" : "No"}</li>
          </ul>
        </section>
      )}

      <section>
        <h2>Players</h2>
        <ul className="lobby-list overflow-y-scroll">
          {lobby.members.map((member) => (
            <MemberRow
              key={member.userId}
              member={member}
              isMe={member.userId === me}
              canKick={isLeader}
              pending={pending}
              onKick={() => run(() => kickPlayer(member.userId))}
              onFriend={() => run(() => sendFriendRequest(member.userId))}
            />
          ))}
        </ul>
      </section>

      <section className="lobby-actions">
        {isLeader ? (
          // TODO(this)
          <button type="button" disabled={!allReady} onClick={startMatch}>
            Start match
          </button>
        ) : (
          <button
            type="button"
            disabled={pending}
            onClick={() => run(toggleReady)}
          >
            {myMember?.ready ? "Unready" : "Ready up"}
          </button>
        )}
        <button
          type="button"
          className="lobby-danger"
          disabled={pending}
          onClick={() => run(leaveLobby)}
        >
          Leave lobby
        </button>
        {isLeader && !allReady && (
          <p className="lobby-meta">Waiting for everyone to be ready.</p>
        )}
      </section>
    </div>
  );
}

function MemberRow({
  member,
  isMe,
  canKick,
  pending,
  onKick,
  onFriend,
}: {
  member: LobbyMemberView;
  isMe: boolean;
  canKick: boolean;
  pending: boolean;
  onKick: () => void;
  onFriend: () => void;
}) {
  return (
    <li className="lobby-item">
      <div className="lobby-member">
        <Avatar image={member.image} className="lobby-avatar" />
        <div>
          <strong>
            {member.isLeader ? "👑 " : ""}
            {member.username}
            {isMe ? " (you)" : ""}
          </strong>
          <div className="lobby-meta">
            {member.ready ? "✅ Ready" : "⏳ Not ready"}
          </div>
        </div>
      </div>

      {!isMe && (
        <div className="lobby-member-buttons">
          {member.friendStatus === "friends" && (
            <span className="badge">Friends</span>
          )}
          {member.friendStatus === "sent" && (
            <button type="button" disabled>
              Request sent
            </button>
          )}
          {member.friendStatus === "received" && (
            <button type="button" disabled={pending} onClick={onFriend}>
              Accept request
            </button>
          )}
          {member.friendStatus === "none" && (
            <button
              type="button"
              className="btn-secondary"
              disabled={pending}
              onClick={onFriend}
            >
              Add friend
            </button>
          )}
          {canKick && (
            <button
              type="button"
              className="lobby-danger"
              disabled={pending}
              onClick={onKick}
            >
              Kick
            </button>
          )}
        </div>
      )}
    </li>
  );
}

function SettingsForm({
  lobby,
  onChange,
  raceData,
  setRaceData,
}: {
  lobby: LobbyView;
  onChange: () => Promise<void>;
  raceData: IRaceCreation;
  setRaceData(data: IRaceCreation): void;
}) {
  const [state, formAction, pending] = useActionState(
    updateSettings,
    undefined,
  );
  const [visibility, setVisibility] = useState(
    lobby.isPublic ? "public" : "private",
  );

  useEffect(() => {
    if (state?.timestamp) onChange();
  }, [state?.timestamp, onChange]);

  return (
    <section>
      <h2>Settings</h2>
      <div
        id="Settings"
        className="profile-grid"
        style={{
          overflow: "scroll",
        }}
      >
        <section
          id="lobbySettings"
          className="profile-card"
          style={{ width: "fit-content" }}
        >
          <form action={formAction} className="lobby-form">
            <div>
              <label htmlFor="set-max">Max players: </label>
              <input
                id="set-max"
                name="maxPlayers"
                type="number"
                min={1}
                max={12}
                defaultValue={lobby.maxPlayers}
              />
            </div>
            {state?.errors?.maxPlayers && (
              <p className="error">{state.errors.maxPlayers[0]}</p>
            )}

            <div>
              <label htmlFor="set-visibility">Visibility: </label>
              <select
                id="set-visibility"
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
                <label htmlFor="set-password">Password: </label>
                <input
                  id="set-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder={lobby.isPublic ? "" : "Leave empty to keep"}
                />
              </div>
            )}
            {state?.errors?.password && (
              <p className="error">{state.errors.password[0]}</p>
            )}

            <div className="lobby-checkbox">
              <input
                id="set-cpu"
                name="cpuTeams"
                type="checkbox"
                defaultChecked={true}
              />
              <label htmlFor="set-cpu">CPU teams participate</label>
            </div>

            {state?.message && <p className="error">{state.message}</p>}
            {state?.success && <p className="success">{state.success}</p>}
            <button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save lobby settings"}
            </button>
          </form>
        </section>
        <RaceCreator
          setRacerCreationData={setRaceData}
          height={
            (document.getElementById("Settings")?.getBoundingClientRect()
              .height ?? 1000) / 3
          }
          width={
            (document.getElementById("Settings")?.getBoundingClientRect()
              .height ?? 1000) / 3
          }
        />
      </div>
    </section>
  );
}
