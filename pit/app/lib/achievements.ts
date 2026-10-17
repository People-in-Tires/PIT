export const ACHIEVEMENT_CATEGORIES = {
  race: "Race & progression",
  pitstop: "Pit stop perfection",
  chaos: "Crashes & chaos",
  special: "Profile & special",
} as const;

export type AchievementCategory = keyof typeof ACHIEVEMENT_CATEGORIES;

export const ACHIEVEMENTS = [
  // Racing
  { key: "first-race", name: "Rookie", description: "Play your first match" },
  { key: "first-podium", name: "Podium Crew", description: "Finish in the top 3" },
  { key: "first-win", name: "Champagne!", description: "Win your first match" },
  { key: "gold-star", name: "Getting Serious", description: "Play 10 matches" },
  { key: "champion", name: "Podium Regular", description: "Finish in the top 3 ten times" },
  { key: "hot-streak", name: "Hat Trick", description: "Win 3 matches in a row" },
  { key: "races-25", name: "Veteran", description: "Play 25 matches" },
  { key: "wins-10", name: "Serial Winner", description: "Win 10 matches" },
  { key: "wins-10-streak", name: "Unstoppable", description: "Win 5 matches in a row" },
  { key: "wins-100", name: "Century Club", description: "Play 100 matches" },

  // Pit stops
  { key: "perfect-tire", name: "Perfect Stop", description: "Make your first perfect pit stop" },
  { key: "sub-2-second-stop", name: "Sub-2 Club", description: "Complete a pit stop in under 2 seconds" },
  { key: "team-high-five", name: "Flawless Crew", description: "Make 5 perfect pit stops in a row" },
  { key: "fastest-stop", name: "Fast & Flawless", description: "Make a perfect pit stop in under 2 seconds" },
  { key: "mechanic", name: "Wheel Gun Wizard", description: "Make 50 perfect pit stops" },
  { key: "garage", name: "Pit Lane Pro", description: "Complete 100 pit stops" },

  // Crashes & chaos
  { key: "confused", name: "Oops...", description: "Make your first pit stop mistake" },
  { key: "lost-wheel", name: "Rubber Everywhere", description: "Lose a tire for the first time" },
  { key: "engine-fire", name: "Firefighter", description: "Cause your first car fire" },
  { key: "dnf-survivor", name: "DNF", description: "Fail to finish a race for the first time" },
  { key: "crash", name: "Crash Test Dummy", description: "Crash 10 times" },

  // Social & milestones
  { key: "friends-10", name: "Social Butterfly", description: "Add 10 friends" },
  { key: "daily-streak", name: "Dedicated Racer", description: "Play matches on 7 different days" },
  { key: "tire-master", name: "Collector", description: "Unlock 10 achievements" },
  { key: "legend", name: "People In Tires", description: "Unlock every other achievement" },
] as const;

export type AchievementKey = (typeof ACHIEVEMENTS)[number]["key"];