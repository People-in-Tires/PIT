// A generated match history between the test users.
//
// Instead of writing 40 matches by hand, they're generated with a *seeded* random
// generator: the numbers look random, but every run produces exactly the same matches.
// That way the test data is predictable, and a bug you find today is still there tomorrow.

import type { PrismaClient } from "../../generated/prisma";
import { idOf, users, type UserIds } from "./users";

const DAY = 24 * 60 * 60 * 1000;
const MINUTE = 60 * 1000;

const MATCH_COUNT = 40;
const FULL_GRID_MATCH = 12; // this match has 12 players, for the "Full Grid" achievement
const MAIN_USER = users[0].username;

type SeedResult = {
  user: string;
  dnf: boolean;
  pitStops: number;
  perfectPitStops: number;
  fastestPitStop: number | null; // milliseconds, null = no pit stop made
  crashes: number;
};

type SeedMatch = {
  daysAgo: number;
  durationMinutes: number;
  results: SeedResult[]; // finishers in finishing order, DNFs at the end
};

// --- Seeded random helpers ---------------------------------------------------

// mulberry32: a tiny pseudo-random generator. Same seed = same sequence of numbers.
function createRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), seed | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = createRandom(42);
const between = (min: number, max: number) => min + Math.floor(random() * (max - min + 1));
const chance = (probability: number) => random() < probability;

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// --- Generating the matches --------------------------------------------------

export function generateMatches(): SeedMatch[] {
  const skillOf = new Map(users.map((u) => [u.username, u.skill]));
  const others = users.slice(1).map((u) => u.username);
  const matches: SeedMatch[] = [];

  for (let i = 0; i < MATCH_COUNT; i++) {
    const size = i === FULL_GRID_MATCH ? 12 : between(2, 8);

    // The main account skips every 4th match: 30 matches played, enough for "Veteran".
    const withMain = i % 4 !== 3;
    const players = withMain
      ? [MAIN_USER, ...shuffle(others).slice(0, size - 1)]
      : shuffle(others).slice(0, size);

    const results = players.map((user) => {
      const skill = skillOf.get(user) ?? 0.5;
      const dnf = chance(0.04 + (1 - skill) * 0.08);
      const pitStops = dnf ? between(0, 1) : between(2, 4);

      let perfectPitStops = 0;
      for (let p = 0; p < pitStops; p++) {
        if (chance(0.25 + 0.55 * skill)) perfectPitStops++;
      }

      let crashes = dnf ? 2 : 0;
      for (let c = 0; c < 3; c++) {
        if (chance((1 - skill) * 0.5)) crashes++;
      }

      return {
        user,
        dnf,
        pitStops,
        perfectPitStops,
        // Better players are faster: roughly 1.9 s for the best, 2.7 s for the worst.
        fastestPitStop:
          pitStops > 0 ? Math.round(2700 - skill * 900 + (random() - 0.5) * 300) : null,
        crashes,
        // Skill plus some luck decides the finishing order.
        performance: skill + (random() - 0.5) * 1.0,
      };
    });

    // A match always has a winner: if everyone crashed out, the best one still finishes.
    if (results.every((r) => r.dnf)) results[0].dnf = false;

    const finishers = results.filter((r) => !r.dnf).sort((a, b) => b.performance - a.performance);
    const dnfs = results.filter((r) => r.dnf);

    matches.push({
      daysAgo: Math.round((MATCH_COUNT - i) * 1.5), // spread over the last 60 days, oldest first
      durationMinutes: between(4, 12),
      results: [...finishers, ...dnfs].map(({ performance, ...result }) => result),
    });
  }

  return matches;
}

// --- Writing them to the database --------------------------------------------

export async function seedMatches(prisma: PrismaClient, ids: UserIds) {
  // Match has no unique field besides its autoincrement id, so upsert isn't possible.
  // Instead: only seed when there are no matches yet, so running the seed twice
  // doesn't double the match history.
  const existing = await prisma.match.count();
  if (existing > 0) {
    console.log(`Skipped matches (${existing} already in database)`);
    return;
  }

  const matches = generateMatches();

  for (const m of matches) {
    const startedAt = new Date(Date.now() - m.daysAgo * DAY);
    const finishedAt = new Date(startedAt.getTime() + m.durationMinutes * MINUTE);

    // Placements count finishers only: a DNF doesn't take up a place.
    let nextPlacement = 1;

    await prisma.match.create({
      data: {
        startedAt,
        finishedAt,
        players: {
          create: m.results.map(({ user, dnf, ...stats }) => ({
            userId: idOf(ids, user),
            placement: dnf ? null : nextPlacement++,
            ...stats,
          })),
        },
      },
    });
  }

  console.log(`Seeded ${matches.length} matches`);
}
