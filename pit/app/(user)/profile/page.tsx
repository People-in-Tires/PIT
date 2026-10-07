import "./profile.css";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { AddFriendButton } from "./friends/add/AddFriend";
import { SettingsOverlay } from "./settings/SettingsOverlay";
import { Notifications } from "./notifications/Notifications";
import { countryCodeToFlagEmoji, countryOptions } from "@/app/lib/countries";
import { FriendsList } from "./friends/list/FriendsList";

export default async function Profile() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { accounts: true },
  });
  if (!user) redirect("/login");

  const connectedProviders = user.accounts.map((account) => account.provider);
  const friendshiprequests = await prisma.friendship.findMany({
    where: { receiverId: user.id, status: "PENDING" },
    select: {
      id: true,
      createdAt: true,
      requester: {
        select: { username: true, image: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <section className="profile-info">
        <div className="button-wrapper">
          <Notifications requests={friendshiprequests} />
          <SettingsOverlay
            profile={user}
            connectedProviders={connectedProviders}
          />
        </div>
        <div className="profile-header">
          <img id="avatar" src={user.image ?? "/default.jpg"} alt="Avatar" />
          <h3 className="username">{user.username}</h3>
          <p className="status">Online status</p>
          <p className="country">
            {countryOptions[user.country]}, {user.country}{" "}
            {countryCodeToFlagEmoji(user.country)}
          </p>
          <p className="">since date</p>
        </div>
      </section>
      <section className="statistics">
        <h2>Statistics</h2>
      </section>
      <section className="recent-matches">
        <h2>Recent Matches</h2>
      </section>
      <section className="friends">
        <h2>Friends</h2>
        <AddFriendButton />
        <FriendsList />
      </section>
      <section>
        <h2>Achievements</h2>
      </section>
    </div>
  );
}
