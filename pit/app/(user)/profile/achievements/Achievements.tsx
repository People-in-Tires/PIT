import "./achievements.css";
import { getRecentAchievements } from "./data";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function Achievements({ userId }: { userId: string }) {
  const { recent, unlockedCount, total } = await getRecentAchievements(userId);

  return (
    <>
      <div className="achievements-head">
        <h2>Achievements</h2>
        <p className="achievements-count">
          {unlockedCount} / {total}
        </p>
      </div>

      {recent.length === 0 ? (
        <p className="achievements-empty">None yet. Finish a race to earn your first!</p>
      ) : (
        <ul className="achievements-grid">
          {recent.map(({ achievement }) => (
            <li key={achievement.key} className="achievement" title={achievement.description}>
              <img
                src={`/icons/achievements/${achievement.key}.png`}
                alt=""
                className="achievement-icon"
              />
              <span className="achievement-name">{achievement.name}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}