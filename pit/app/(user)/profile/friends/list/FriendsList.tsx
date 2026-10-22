import "./list.css";
import { auth } from "@/app/lib/auth";
import { getFriends } from "./data";
import { Avatar } from "@/app/components/ui/Avatar";
import { FriendItem } from "./FriendItem";

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
        <FriendItem
          key={friend.id}
          friend={{
            id: friend.id,
            username: friend.username,
            image: friend.image,
            online: friend.online,
          }}
        />
      ))}
    </ul>
  );
}
