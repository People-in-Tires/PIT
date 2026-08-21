"use client";

import { useActionState } from "react";
import "./profile.css";

export default function Statistics() {
  // const [state, action, pending] = useActionState(signin, undefined)

  return (
    <div>
      <h1>Statistics</h1>
      <section className="win-statistics">
        <h2>Win statistics:</h2>
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
      </section>
      <section className="chaos-statistics">
        -- 🔥 Cars Set on Fire 🧯 Fires Extinguished 🛞 Wheels Lost 🔩 Wheels
        Mounted Crooked ⛽ Fuel Spilled 💥 Explosions Caused 🚨 Unsafe Releases
        🔧 Emergency Repairs 🚑 Rescue Calls 🚩 Race Ruined 😵 Crew Knockouts 🤦
        Total Mistakes --
        <h2>Chaos Statistics:</h2>
        <div className="stat-blocks">
          <div className="stat-block">
            <div className="stat-icon">🔥</div>
            <div className="stat-title">Cars Set on Fire</div>
            <div className="stat-value" id="cars-on-fire">
              11
            </div>
          </div>
          <div className="stat-block">
            <div className="stat-icon">🛞</div>
            <div className="stat-title">Wheels Lost</div>
            <div className="stat-value" id="wheels-lost">
              5
            </div>
          </div>
          <div className="stat-block">
            <div className="stat-icon">🚩</div>
            <div className="stat-title">Race Ruined</div>
            <div className="stat-value" id="race-ruined">
              3
            </div>
          </div>
        </div>
      </section>
      <section className="personal-records">
        -- ⚡ Fastest Tire Change Ever ⛽ Fastest Refuel Ever 🔧 Fastest
        Complete Pit Stop 🔥 Most Fires In One Match 🛞 Most Wheels Lost In One
        Match 🎯 Highest Accuracy 👑 Longest Perfect Combo --
        <h2>Personal Records:</h2>
        <div className="stat-blocks">
          <div className="stat-block">
            <div className="stat-icon">⛽</div>
            <div className="stat-title">Fastest Refuel Ever</div>
            <div className="stat-value" id="fastest-refuel">
              0.560s
            </div>
          </div>
          <div className="stat-block">
            <div className="stat-icon">🛞</div>
            <div className="stat-title">Fastest Tire Change Ever</div>
            <div className="stat-value" id="fastest-tire-change">
              0.630s
            </div>
          </div>
          <div className="stat-block">
            <div className="stat-icon">🔧</div>
            <div className="stat-title">Fastest Complete Pit Stop</div>
            <div className="stat-value" id="fastest-pitstop">
              0.950s
            </div>
          </div>
        </div>
      </section>
      <section className="achievements">
        -- 🔥 Firestarter 50 auto's in brand gezet 🧯 Firefighter 100 branden
        geblust ⚡ Lightning Hands Pitstop 2 sec 🔧 Master Mechanic 500 perfecte
        pitstops 🛞 Tire Whisperer 1000 banden gewisseld 💥 Chaos Engineer Meer
        fouten dan successen 🤡 Intern Eerste 10 pitstops 👑 Pit Legend Top 100
        wereldwijd 🚀 Speed Demon 25 perfecte pitstops achter elkaar --
        <h2>Achievements:</h2>
        <div className="stat-blocks">
          <div className="stat-block">
            <div className="stat-icon">🔥</div>
            <div className="stat-title">Firestarter</div>
            <div className="stat-value" id="firestarter">
              50 auto's in brand gezet
            </div>
          </div>
          <div className="stat-block">
            <div className="stat-icon">🛞</div>
            <div className="stat-title">Tire Whisperer</div>
            <div className="stat-value" id="tire-whisperer">
              1000 banden gewisseld
            </div>
          </div>
          <div className="stat-block">
            <div className="stat-icon">📈</div>
            <div className="stat-title">Speed Demon</div>
            <div className="stat-value" id="speed-demon">
              25 perfecte pitstops achter elkaar
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
