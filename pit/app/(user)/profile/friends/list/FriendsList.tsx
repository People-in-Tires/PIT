import "./list.css";
import { auth } from "@/app/lib/auth";
import { isOnline } from "@/app/lib/online/online";
import { prisma } from "@/app/lib/prisma";

export async function FriendsList() {
  const session = await auth();
  const me = session?.user?.id;
  if (!me) return null;

  const list = await prisma.friend.findMany({
    where: { userId: me },
    select: {
      friend: {
        select: { id: true, username: true, image: true, lastSeenAt: true },
      },
    },
    orderBy: { since: "desc" },
  });

  const friends = list
    .map((row) => ({ ...row.friend, online: isOnline(row.friend.lastSeenAt) }))
    .sort((a, b) => Number(b.online) - Number(a.online));

  if (friends.length === 0) {
    return <p className="friends-empty">No friends yet. Add someone!</p>;
  }

  return (
    <ul className="friends-list">
      {friends.map((friend) => (
        <li key={friend.id} className="friends-item">
          {friend.image ? (
            <img src={friend.image} alt="" className="friends-avatar" />
          ) : (
            <div className="friends-avatar friends-avatar-placeholder">
              {friend.username[0].toUpperCase()}
            </div>
          )}
          <span className="friends-username">{friend.username}</span>
          <span
            role="img"
            aria-label={friend.online ? "Online" : "Offline"}
            className={`friends-status ${friend.online ? "friends-status-online" : "friends-status-offline"}`}
          />
        </li>
      ))}
    </ul>
  );
}
