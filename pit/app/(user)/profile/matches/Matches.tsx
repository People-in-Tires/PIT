import "./matches.css";
import { formatSeconds } from "@/app/lib/format";
import { getRecentMatches } from "./data";

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const fullDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
});

function timeAgo(date: Date): string {
  const days = Math.floor(
    (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (days < 7) return relative.format(-days, "day");
  if (days < 30) return relative.format(-Math.floor(days / 7), "week");
  return fullDate.format(date);
}

function placementIcon(placement: number | null): string {
  if (placement === null) return "races"; // swap for "dnf" once that icon exists
  if (placement === 1) return "wins";
  if (placement <= 3) return "podiums";
  return "races";
}

function placementClass(placement: number | null): string {
  if (placement === null) return "match-pos-dnf";
  if (placement === 1) return "match-pos-gold";
  if (placement === 2) return "match-pos-silver";
  if (placement === 3) return "match-pos-bronze";
  return "match-pos";
}

export default async function Matches({ userId }: { userId: string }) {
  const matches = await getRecentMatches(userId);

  return (
    <>
      <h2>Recent races</h2>
      {matches.length === 0 ? (
        <p className="matches-empty">No races yet. Time to hit the track!</p>
      ) : (
        <ul className="matches-list">
          {matches.map((mp) => (
            <li key={mp.matchId} className="match-row">
              <img
                src={`/icons/stats/${placementIcon(mp.placement)}.png`}
                alt=""
                className={
                  mp.placement === null ? "match-icon-dnf" : "match-icon"
                }
              />
              <span className={placementClass(mp.placement)}>
                {mp.placement === null ? "DNF" : `P${mp.placement}`}
              </span>

              <span className="match-detail">
                <img
                  src="/icons/stats/fastest.png"
                  alt=""
                  className="match-detail-icon"
                />
                {formatSeconds(mp.fastestPitStop)}
              </span>
              <span className="match-detail">
                <img
                  src="/icons/stats/perfect.png"
                  alt=""
                  className="match-detail-icon"
                />
                {mp.perfectPitStops}/{mp.pitStops} perfect
              </span>
              <span className="match-players">
                {mp.match._count.players} players
              </span>

              {mp.match.finishedAt && (
                <time
                  className="match-time"
                  dateTime={mp.match.finishedAt.toISOString()}
                >
                  {timeAgo(mp.match.finishedAt)}
                </time>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
