import "./profile.css";
import "./delete.css";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { Connect42, ConnectGitHub, Logout } from "./Buttons";
import { DeleteProfile } from "./delete/DeleteProfile";
import { countryCodeToFlagEmoji, countryOptions } from "@/app/lib/countries";
import { calculateAge } from "@/app/lib/age";
import { EditProfile } from "./edit/EditProfile";

export default async function Profile() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { accounts: true },
  });
  if (!user) redirect("/login");
  if (!user.username) redirect("/create");

  const connectedProviders = user.accounts.map((account) => account.provider);

  return (
    <div>
      <div className="button-wrapper">
        <EditProfile profile={user} />
        <button>Change Password</button>
        <DeleteProfile />
        <ConnectGitHub connected={connectedProviders.includes("github")} />
        <Connect42 connected={connectedProviders.includes("42-school")} />
        <Logout />
      </div>
      <section className="profile-info">
        <div className="profile-header">
          <img id="avatar" src={user.image ?? "/default.jpg"} alt="Avatar" />
          <h2 className="username">{user.username}</h2>
        </div>
        <p>
          <strong>Name: </strong>
          <span className="name">{user.name}</span>
        </p>
        <p>
          <strong>Age: </strong>
          <span className="age">{calculateAge(user.birthday)}</span>
        </p>
        <p>
          <strong>Country: </strong>
          <span className="country">
            {countryOptions[user.country]}, {user.country}{" "}
            {countryCodeToFlagEmoji(user.country)}
          </span>
        </p>
        <p>
          <strong>Email address: </strong>
          <span className="email-address">{user.email}</span>
        </p>
      </section>
      <section className="statistics">
        <h2>Statistics:</h2>
        <div className="stat-blocks">
          <div className="stat-block">
            <div className="stat-icon">🏆</div>
            <div className="stat-title">Wins</div>
            <div className="stat-value" id="wins">
              20
            </div>
          </div>
          <div className="stat-block">
            <div className="stat-icon">❌</div>
            <div className="stat-title">Losses</div>
            <div className="stat-value" id="losses">
              10
            </div>
          </div>
          <div className="stat-block">
            <div className="stat-icon">📈</div>
            <div className="stat-title">Winrate</div>
            <div className="stat-value" id="winrate">
              33.33%
            </div>
          </div>
        </div>
        <h3>Recent Matches:</h3>
        <ol id="recent-matches">
          <li>🏁 Victory</li>
          <li>❌ Defeat</li>
          <li>🏁 Victory</li>
          <li>🏁 Victory</li>
          <li>❌ Defeat</li>
        </ol>
      </section>
      <section className="friends">
        <h2>Friends:</h2>
        <ul id="friends-list">
          <li>
            <span className="friend-name">🏎️ Lewis_H44</span>
            <span className="friend-rank">🏆 #12</span>
          </li>
          <li>
            <span className="friend-name">🔧 PitBoss</span>
            <span className="friend-rank">🏆 #37</span>
          </li>
          <li>
            <span className="friend-name">⚡ GearHead</span>
            <span className="friend-rank">🏆 #84</span>
          </li>
          <li>
            <span className="friend-name">🏁 FastLap</span>
            <span className="friend-rank">🏆 #156</span>
          </li>
          <li>
            <span className="friend-name">🚥 Overtake99</span>
            <span className="friend-rank">🏆 #241</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
