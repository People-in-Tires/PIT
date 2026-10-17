import "./list.css";
import { auth } from "@/app/lib/auth";
import { getFriends } from "./data";
import { Avatar } from "@/app/components/ui/Avatar";

export async function FriendsList() {
  const session = await auth();
  const me = session?.user?.id;
  if (!me) return null;

  const friends = await getFriends(me);

  if (friends.length === 0) {
    return <p className="friends-empty">No friends yet. Add someone!</p>;
  }

  return (
    <ul className="friends-list">
      {friends.map((friend) => (
        <li key={friend.id} className="friends-item">
          <Avatar image={friend.image} className="friends-avatar" />
          <span className="friends-username">{friend.username}</span>
          <span className={friend.online ? "friends-status-online" : "friends-status"}>
            {friend.online ? "Online" : "Offline"}
          </span>
        </li>
      ))}
    </ul>
  );
}
