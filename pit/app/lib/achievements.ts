export const ACHIEVEMENT_CATEGORIES = {
  race: "Race & progression",
  pitstop: "Pit stop perfection",
  chaos: "Crashes & chaos",
  social: "Friends & milestones",
  special: "Profile & special",
} as const;

export type AchievementCategory = keyof typeof ACHIEVEMENT_CATEGORIES;

type AchievementDefinition = {
  key: string;
  name: string;
  description: string;
  category: AchievementCategory;
};

export const ACHIEVEMENTS = [
  // Racing
  {
    key: "first-race",
    name: "Rookie",
    description: "Play your first match",
    category: "race",
  },
  {
    key: "first-finish",
    name: "Chequered Flag",
    description: "Finish a match",
    category: "race",
  },
  {
    key: "first-podium",
    name: "Podium Crew",
    description: "Finish in the top 3",
    category: "race",
  },
  {
    key: "first-win",
    name: "Champagne!",
    description: "Win your first match",
    category: "race",
  },
  {
    key: "gold-star",
    name: "Getting Serious",
    description: "Play 10 matches",
    category: "race",
  },
  {
    key: "champion",
    name: "Podium Regular",
    description: "Finish in the top 3 ten times",
    category: "race",
  },
  {
    key: "hot-streak",
    name: "Hat Trick",
    description: "Win 3 matches in a row",
    category: "race",
  },
  {
    key: "races-25",
    name: "Veteran",
    description: "Play 25 matches",
    category: "race",
  },
  {
    key: "wins-10",
    name: "Serial Winner",
    description: "Win 10 matches",
    category: "race",
  },
  {
    key: "wins-10-streak",
    name: "Unstoppable",
    description: "Win 5 matches in a row",
    category: "race",
  },
  {
    key: "wins-100",
    name: "Century Club",
    description: "Play 100 matches",
    category: "race",
  },

  // Pit stops
  {
    key: "first-pit-stop",
    name: "First Stop",
    description: "Complete your first pit stop",
    category: "pitstop",
  },
  {
    key: "perfect-tire",
    name: "Perfect Stop",
    description: "Make your first perfect pit stop",
    category: "pitstop",
  },
  {
    key: "sub-2-second-stop",
    name: "Sub-2 Club",
    description: "Complete a pit stop in under 2 seconds",
    category: "pitstop",
  },
  {
    key: "team-high-five",
    name: "Flawless Crew",
    description: "Make 5 perfect pit stops in a row",
    category: "pitstop",
  },
  {
    key: "fastest-stop",
    name: "Fast & Flawless",
    description: "Make a perfect pit stop in under 2 seconds",
    category: "pitstop",
  },
  {
    key: "pit-stops-50",
    name: "Tire Changer",
    description: "Complete 50 pit stops",
    category: "pitstop",
  },
  {
    key: "mechanic",
    name: "Wheel Gun Wizard",
    description: "Make 50 perfect pit stops",
    category: "pitstop",
  },
  {
    key: "garage",
    name: "Pit Lane Pro",
    description: "Complete 100 pit stops",
    category: "pitstop",
  },
  {
    key: "pit-stops-500",
    name: "Pit Lane Legend",
    description: "Complete 500 pit stops",
    category: "pitstop",
  },

  // Crashes & chaos
  {
    key: "confused",
    name: "Oops...",
    description: "Make your first pit stop mistake",
    category: "chaos",
  },
  {
    key: "lost-wheel",
    name: "Rubber Everywhere",
    description: "Lose a tire for the first time",
    category: "chaos",
  },
  {
    key: "engine-fire",
    name: "Firefighter",
    description: "Cause your first car fire",
    category: "chaos",
  },
  {
    key: "dnf-survivor",
    name: "DNF",
    description: "Fail to finish a race for the first time",
    category: "chaos",
  },
  {
    key: "crash",
    name: "Crash Test Dummy",
    description: "Crash 10 times",
    category: "chaos",
  },

  // Friends & milestones
  {
    key: "friend-invited",
    name: "Radio Check",
    description: "Send your first friend request",
    category: "social",
  },
  {
    key: "friends-10",
    name: "Social Butterfly",
    description: "Add 10 friends",
    category: "social",
  },
  {
    key: "daily-streak",
    name: "Dedicated Racer",
    description: "Play matches on 7 different days",
    category: "social",
  },
  {
    key: "tire-master",
    name: "Collector",
    description: "Unlock 10 achievements",
    category: "social",
  },

  // Profile & special
  {
    key: "account-created",
    name: "Welcome to the Crew",
    description: "Create your account",
    category: "special",
  },
  {
    key: "profile-edited",
    name: "Fresh Livery",
    description: "Edit your profile",
    category: "special",
  },
  {
    key: "password-changed",
    name: "New Combination",
    description: "Change your password",
    category: "special",
  },
  {
    key: "theme-changed",
    name: "Paint Shop",
    description: "Pick a different theme",
    category: "special",
  },
  {
    key: "account-linked",
    name: "Team Radio",
    description: "Link your GitHub or 42 account",
    category: "special",
  },
  {
    key: "legend",
    name: "People In Tires",
    description: "Unlock every other achievement",
    category: "special",
  },
] as const satisfies readonly AchievementDefinition[];

export type AchievementKey = (typeof ACHIEVEMENTS)[number]["key"];
