import "./achievements.css";
import { prisma } from "@/app/lib/prisma";

export default async function Achievements({ userId }: { userId: string }) {
  const achievements = await prisma.userAchievement.findMany({
    where: {
      userId,
     },
    orderBy: { unlockedAt: "desc" },
    take: 6,
    select: {
      achievementId: true,
      achievement: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div>
      <h2>ACHIEVEMENTS</h2>
      { achievements.length === 0 ? (
        <p>No achievements collected</p>
      ) : (
        <ul className="achievements">
          {achievements.map((a) => (
            <li key={a.achievementId} className="achievement">
              <span className="achievement-name">
                {a.achievement.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
