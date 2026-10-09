import "./matches.css";
import { prisma } from "@/app/lib/prisma";

export default async function Matches({ userId }: { userId: string }) {
  const recentMatches = await prisma.matchPlayer.findMany({
    where: {
      userId,
      match: { finishedAt: { not: null } },
     },
    orderBy: { match: { finishedAt: "desc" } },
    take: 5,
    select: {
      matchId: true,
      placement: true,
      pitStops: true,
      match: {
        select: {
          finishedAt: true,
          _count: { select: { players: true } },
        },
      },
    },
  });

  return (
    <div>
      <h2>RECENT MATCHES</h2>
      { recentMatches.length === 0 ? (
        <p>No matches played yet</p>
      ) : (
        <ul className="matches">
          {recentMatches.map((mp) => (
            <li key={mp.matchId} className="match-row">
              <span className="match-placement">
                {mp.placement === null
                  ? "DNF"
                  : `${mp.placement}/${mp.match._count.players}`}
              </span>
              <span className="match-middle">{mp.pitStops} pit stops</span>
              <span className="match-finished">
                {mp.match.finishedAt === null
                  ? "Not finished"
                  : mp.match.finishedAt.toLocaleDateString("en-GB")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
