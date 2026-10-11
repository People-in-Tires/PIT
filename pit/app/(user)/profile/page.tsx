import "./profile.css";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { AddFriendButton } from "./friends/add/AddFriend";
import { SettingsOverlay } from "./settings/SettingsOverlay";
import { Notifications } from "./notifications/Notifications";
import { countryCodeToFlagEmoji, countryOptions } from "@/app/lib/countries";
import { FriendsList } from "./friends/list/FriendsList";
import Statistics from "./statistics/Statistics";
import Matches from "./matches/Matches";
import Achievements from "./achievements/Achievements";
import { ChooseAvatar } from "./avatar/Avatar";
import { getProfile } from "./data";
import { getPendingFriendRequests } from "./notifications/data";
import { getConnectedProviders } from "./settings/connections/data";
import { isOnline } from "@/app/lib/online/online";

const memberSince = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
});

export default async function Profile() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await getProfile(session.user.id);
  if (!user) redirect("/login");

  const friendRequests = await getPendingFriendRequests(user.id);
  const connections = await getConnectedProviders(user.id);

  return (
    <div>
      <section className="profile-info">
        <div className="button-wrapper">
          <Notifications requests={friendRequests} />
          <SettingsOverlay profile={user} connections={connections} />
        </div>
        <div className="profile-header">
          <ChooseAvatar image={user.image} />
          <h3 className="username">{user.username}</h3>
          <p className="status">
            {isOnline(user.lastSeenAt) ? (
              <>
                <span className="status-dot status-dot--online" /> Online
              </>
            ) : (
              <>
                <span className="status-dot" /> Offline
              </>
            )}
          </p>
          <p className="country">
            {countryOptions[user.country]}, {user.country}{" "}
            {countryCodeToFlagEmoji(user.country)}
          </p>
          <p className="since">
            Member since {memberSince.format(user.createdAt)}
          </p>
        </div>
      </section>
      <section className="statistics">
        <Statistics userId={user.id} />
      </section>
      <section className="recent-matches">
        <Matches userId={user.id} />
      </section>
      <section className="friends">
        <h2>FRIENDS</h2>
        <AddFriendButton />
        <FriendsList />
      </section>
      <section>
        <Achievements userId={user.id} />
      </section>
    </div>
  );
}
