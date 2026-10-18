// Test users so you don't have to sign up by hand.

import bcrypt from "bcryptjs";
import type { PrismaClient } from "../../generated/prisma";

// Same password for every test user, so it's easy to remember.
// Make sure it passes your own signup validation rules.
export const TEST_PASSWORD = "Test1234!";

// Same rule as signup: usernames need at least 6 characters.
const MIN_USERNAME_LENGTH = 6;

// Maps a username to the user's id, so other seed files can refer to users by name.
export type UserIds = Record<string, string>;

type SeedUser = {
  username: string;
  name: string;
  email: string;
  country: string;
  birthday: string; // YYYY-MM-DD
  // Not stored in the database: only used by matches.ts to decide
  // how well this player does (0 = always last, 1 = always wins).
  skill: number;
};

// The first user is the main test account: most friends, requests and achievements.
export const users: SeedUser[] = [
  {
    username: "PitQueen_99",
    name: "Femke de Vries",
    email: "pitqueen@pit.test",
    country: "NL",
    birthday: "1998-04-12",
    skill: 0.85,
  },
  {
    username: "Lugnut_Larry",
    name: "Lars Peeters",
    email: "lugnut@pit.test",
    country: "BE",
    birthday: "1995-09-30",
    skill: 0.6,
  },
  {
    username: "WheelGun.Wendy",
    name: "Wenke Schulz",
    email: "wheelgun@pit.test",
    country: "DE",
    birthday: "2000-01-05",
    skill: 0.7,
  },
  {
    username: "Turbo_Tina42",
    name: "Tina Moreau",
    email: "turbo@pit.test",
    country: "FR",
    birthday: "1997-06-21",
    skill: 0.8,
  },
  {
    username: "Crash-Bandit",
    name: "Carlos Ruiz",
    email: "crash@pit.test",
    country: "ES",
    birthday: "1999-11-11",
    skill: 0.25,
  },
  {
    username: "Jackman_07",
    name: "Giulia Bianchi",
    email: "jackman@pit.test",
    country: "IT",
    birthday: "2001-03-17",
    skill: 0.5,
  },
  {
    username: "TyreWhisperer",
    name: "Oliver Hughes",
    email: "tyre@pit.test",
    country: "GB",
    birthday: "1994-08-02",
    skill: 0.75,
  },
  {
    username: "Slick_Rick",
    name: "Rick Johnson",
    email: "slick@pit.test",
    country: "US",
    birthday: "1996-12-24",
    skill: 0.45,
  },
  {
    username: "DRS_Dennis",
    name: "Dennis Bakker",
    email: "drs@pit.test",
    country: "NL",
    birthday: "2002-05-09",
    skill: 0.55,
  },
  {
    username: "Fuel4Speed",
    name: "Inês Costa",
    email: "fuel@pit.test",
    country: "PT",
    birthday: "1998-10-30",
    skill: 0.5,
  },
  {
    username: "Box_Box_Box",
    name: "Lukas Gruber",
    email: "boxbox@pit.test",
    country: "AT",
    birthday: "1993-02-14",
    skill: 0.65,
  },
  {
    username: "Undercut_Uma",
    name: "Uma Lindqvist",
    email: "undercut@pit.test",
    country: "SE",
    birthday: "2000-07-07",
    skill: 0.7,
  },
  {
    username: "Pitlane.Pete",
    name: "Patrick Byrne",
    email: "pitlane@pit.test",
    country: "IE",
    birthday: "1997-01-28",
    skill: 0.4,
  },
  {
    username: "GridGhost_3",
    name: "Zofia Nowak",
    email: "gridghost@pit.test",
    country: "PL",
    birthday: "2003-09-03",
    skill: 0.3,
  },
  {
    username: "Hairpin_Hana",
    name: "Hana Sato",
    email: "hairpin@pit.test",
    country: "JP",
    birthday: "1999-04-01",
    skill: 0.6,
  },
  {
    username: "Torque_Tom88",
    name: "Tom Nielsen",
    email: "torque@pit.test",
    country: "DK",
    birthday: "1988-06-15",
    skill: 0.55,
  },
  {
    username: "Kerb-Crawler",
    name: "Nina Keller",
    email: "kerb@pit.test",
    country: "CH",
    birthday: "2001-11-20",
    skill: 0.45,
  },
  {
    username: "ChequeredFlo",
    name: "Florence Tremblay",
    email: "chequered@pit.test",
    country: "CA",
    birthday: "1996-03-03",
    skill: 0.65,
  },
  {
    username: "Apex_Ava",
    name: "Ava Mitchell",
    email: "apex@pit.test",
    country: "AU",
    birthday: "2002-12-12",
    skill: 0.5,
  },
  {
    username: "SafetyCar_Sam",
    name: "Samuel Oliveira",
    email: "safetycar@pit.test",
    country: "BR",
    birthday: "1995-05-25",
    skill: 0.4,
  },
];

export async function seedUsers(prisma: PrismaClient): Promise<UserIds> {
  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);
  const ids: UserIds = {};

  // `skill` is pulled out because it isn't a column on User.
  for (const { skill, ...u } of users) {
    // The seed skips your signup form, so it checks the rule itself.
    if (u.username.length < MIN_USERNAME_LENGTH) {
      throw new Error(
        `Seed: username "${u.username}" is shorter than ${MIN_USERNAME_LENGTH} characters`,
      );
    }

    // upsert: create the user if the email doesn't exist yet, otherwise leave it alone.
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        ...u,
        birthday: new Date(u.birthday),
        passwordHash,
      },
    });

    ids[u.username] = user.id;
  }

  return ids;
}

// Fails loudly on a typo in a username instead of inserting `undefined`.
export function idOf(ids: UserIds, username: string): string {
  const id = ids[username];
  if (!id) throw new Error(`Seed: unknown username "${username}"`);
  return id;
}
