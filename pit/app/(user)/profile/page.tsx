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
import { getProfile } from "./data";
import { getPendingFriendRequests } from "./notifications/data";
import { getLinkedAccounts } from "./settings/account/linked-accounts/data";
import { isOnline } from "@/app/lib/online/online";
import { Avatar } from "@/app/components/ui/Avatar";
import Link from "next/link";

const memberSince = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
});

export default async function Profile() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await getProfile(session.user.id);
  if (!user) redirect("/login");

  const [friendRequests, linkedAccounts] = await Promise.all([
    getPendingFriendRequests(user.id),
    getLinkedAccounts(user.id),
  ]);

  const online = isOnline(user.lastSeenAt);

  return (
    <main className="profile-page">
      <div className="profile-top">
        <section className="profile-header">
          <div className="profile-banner" />
          <div className="profile-identity">
            <Avatar image={user.image} className="profile-avatar" />
            <div>
              <h1 className="profile-username">{user.username}</h1>
              <p className="profile-meta">
                <span
                  className={online ? "profile-dot-online" : "profile-dot"}
                />
                {online ? "Online" : "Offline"} · {countryOptions[user.country]}{" "}
                {countryCodeToFlagEmoji(user.country)} · since{" "}
                {memberSince.format(user.createdAt)}
              </p>
            </div>
          </div>
        </section>

        <div className="profile-actions">
          <Link href="/" className="profile-garage" aria-label="Back to garage">
            <img
              src="/icons/garage.png"
              alt=""
              className="profile-garage-icon"
            />
          </Link>
          <Notifications requests={friendRequests} />
          <SettingsOverlay profile={user} linkedAccounts={linkedAccounts} />
        </div>
      </div>

      <Statistics userId={user.id} />

      <div className="profile-grid">
        <section className="profile-card">
          <Matches userId={user.id} />
        </section>

        <div className="profile-column">
          <section className="profile-card">
            <div className="profile-card-head">
              <h2>Friends</h2>
              <AddFriendButton />
            </div>
            <FriendsList />
          </section>

          <section className="profile-card">
            <Achievements userId={user.id} />
          </section>
        </div>
      </div>
    </main>
  );
}
