'use client'

import { useActionState } from "react";
import "./profile.css";

export default function Profile() {
	// const [state, action, pending] = useActionState(signin, undefined)

	return (

<div>
<section className="profile-info">
      <div id="profile-header">
        <img id="avatar" src="Avatar.png" alt="Avatar" />
        <h2 id="username">lauraaaatje</h2>
      </div>
      <p>
        <strong>First name: </strong>
        <span id="first-name"></span>
      </p>
      <p>
        <strong>Last name: </strong>
        <span id="last-name"></span>
      </p>
      <p>
        <strong>Age: </strong>
        <span id="age"></span>
      </p>
      <p>
        <strong>Country: </strong>
        <span id="country"></span>
      </p>
    </section>
    <section className="login-info">
      <p>
        <strong>Username: </strong>
        <span id="username"></span>
      </p>
      <p>
        <strong>Email address: </strong>
        <span id="email-address"></span>
      </p>
    </section>
    <button id="change-password">Change Password</button>
    <section className="statistics">
      <h2>Statistics:</h2>
      <div className="stat-blocks">
        <div className="stat-block">
          <div className="stat-icon">🏆</div>
          <div className="stat-title">Wins</div>
          <div className="stat-value" id="wins">20</div>
        </div>
        <div className="stat-block">
          <div className="stat-icon">❌</div>
          <div className="stat-title">Losses</div>
          <div className="stat-value" id="losses">10</div>
        </div>
        <div className="stat-block">
          <div className="stat-icon">📈</div>
          <div className="stat-title">Winrate</div>
          <div className="stat-value" id="winrate">33.33%</div>
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
    <button id="edit-profile">Edit profile</button>
</div>
	);
}