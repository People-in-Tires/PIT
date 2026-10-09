import "./statistics.css";
import { getUserStatistics } from "./data";

export default async function Statistics({ userId }: { userId: string }) {
  const stats = await getUserStatistics(userId);

  return (
    <div>
      <h2>PIT CREW STATS</h2>
      <section className="statistics">
        <div className="stat-blocks">
          <div className="stat-block">
            <div className="stat-title">First</div>
            <div className="stat-value" id="first"> { stats.first } </div>
          </div>
          <div className="stat-block">
            <div className="stat-title">Podium</div>
            <div className="stat-value" id="podium"> { stats.podium } </div>
          </div>
          <div className="stat-block">
            <div className="stat-title">Matches</div>
            <div className="stat-value" id="matches"> { stats.matchesPlayed } </div>
          </div>
          <div className="stat-block">
            <div className="stat-title">Fastest</div>
            <div className="stat-value" id="fastest"> { stats.fastestPitStopTime } </div>
          </div>
          <div className="stat-block">
            <div className="stat-title">Perfect</div>
            <div className="stat-value" id="perfect"> { stats.perfectPitStops } </div>
          </div>
        </div>
      </section>
    </div>
  );
}
