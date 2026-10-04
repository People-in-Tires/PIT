import "./list.css";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function FriendsList() {
  const session = await auth();
  const me = session?.user?.id;
  if (!me) return null;

  const friendships = await prisma.friendship.findMany({
    where: {
      status: "ACCEPTED",
      OR: [{ requesterId: me }, { receiverId: me }],
    },
    select: {
      requesterId: true,
      requester: { select: { id: true, username: true, image: true } },
      receiver: { select: { id: true, username: true, image: true } },
    },
    orderBy: { acceptedAt: "desc" },
  });

  // Elke rij bevat mij én de ander, dus ik pak de kant die niet ik ben
  const friends = friendships.map((f) =>
    f.requesterId === me ? f.receiver : f.requester,
  );

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
        </li>
      ))}
    </ul>
  );
}