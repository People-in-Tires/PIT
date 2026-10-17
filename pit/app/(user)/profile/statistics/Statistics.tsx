import "./statistics.css";
import type { CSSProperties } from "react";
import { getUserStatistics } from "./data";
import { formatSeconds } from "@/app/lib/format";

function percent(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}

type StatTileProps = {
  className: string;
  icon: string;
  label: string;
  value: number;
  extra?: string;
  progress?: number;
};

function StatTile({ className, icon, label, value, extra, progress }: StatTileProps) {
  return (
    <div className={className}>
      <div className="stats-text">
        <p className="stats-value">{value}</p>
        <p className="stats-label">{label}</p>
        {extra && <p className="stats-extra">{extra}</p>}
      </div>
      <img src={`/icons/stats/${icon}.png`} alt="" className="stats-icon" />
      {progress !== undefined && (
        <div className="stats-bar">
          <div
            className="stats-bar-fill"
            style={{ "--progress": `${progress}%` } as CSSProperties}
          />
        </div>
      )}
    </div>
  );
}

export default async function Statistics({ userId }: { userId: string }) {
  const stats = await getUserStatistics(userId);

  const winRate = percent(stats.first, stats.matchesPlayed);
  const podiumRate = percent(stats.podium, stats.matchesPlayed);
  const perfectRate = percent(stats.perfectPitStops, stats.pitStops);

  return (
    <section className="stats">
      <h2 className="stats-title">Pit crew stats</h2>
      <div className="stats-grid">
        <StatTile
          className="stats-wins"
          icon="wins"
          label="Wins"
          value={stats.first}
          extra={`${winRate}% win rate`}
        />
        <StatTile
          className="stats-podiums"
          icon="podiums"
          label="Podiums"
          value={stats.podium}
          extra={`${podiumRate}% top 3`}
        />
        <StatTile
          className="stats-races"
          icon="races"
          label="Races"
          value={stats.matchesPlayed}
          extra={`${stats.pitStops} pit stops`}
        />
        <StatTile
          className="stats-perfect"
          icon="perfect"
          label="Perfect stops"
          value={stats.perfectPitStops}
          extra={`${perfectRate}% perfect`}
          progress={perfectRate}
        />

        <div className="stats-record">
          <img src="/icons/stats/fastest.png" alt="" className="stats-record-icon" />
          <p className="stats-record-value">{formatSeconds(stats.fastestPitStop)}</p>
          <p className="stats-record-label">Fastest pit stop</p>
          {stats.fastestPitStop !== null && <p className="stats-record-note">★ Personal record</p>}
        </div>
      </div>
    </section>
  );
}