<html>
  <head>
    <title>Profile Page</title>
    <link rel="stylesheet" href="../styles/user_profile.css" />
  </head>
  <body>
    <section class="profile-info">
      <div id="profile-header">
        <img id="avatar" src="avatar.jpeg" alt="Avatar" />
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
    <section class="login-info">
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
    <section class="statistics">
      <h2>Statistics:</h2>
      <div class="stat-blocks">
        <div class="stat-block">
          <div class="stat-icon">🏆</div>
          <div class="stat-title">Wins</div>
          <div class="stat-value" id="wins">
            20
          </div>
        </div>
        <div class="stat-block">
          <div class="stat-icon">❌</div>
          <div class="stat-title">Losses</div>
          <div class="stat-value" id="losses">
            10
          </div>
        </div>
        <div class="stat-block">
          <div class="stat-icon">📈</div>
          <div class="stat-title">Winrate</div>
          <div class="stat-value" id="winrate">
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
    <section class="friends">
      <h2>Friends:</h2>
      <ul id="friends-list">
        <li>
          <span class="friend-name">🏎️ Lewis_H44</span>
          <span class="friend-rank">🏆 #12</span>
        </li>
        <li>
          <span class="friend-name">🔧 PitBoss</span>
          <span class="friend-rank">🏆 #37</span>
        </li>
        <li>
          <span class="friend-name">⚡ GearHead</span>
          <span class="friend-rank">🏆 #84</span>
        </li>
        <li>
          <span class="friend-name">🏁 FastLap</span>
          <span class="friend-rank">🏆 #156</span>
        </li>
        <li>
          <span class="friend-name">🚥 Overtake99</span>
          <span class="friend-rank">🏆 #241</span>
        </li>
      </ul>
    </section>
    <button id="edit-profile">Edit profile</button>
  </body>
</html>;
