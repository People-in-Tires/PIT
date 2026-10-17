// Test users so you don't have to sign up by hand.

import bcrypt from "bcryptjs";
import type { PrismaClient } from "../../generated/prisma";

// Same password for every test user, so it's easy to remember.
// Make sure it passes your own signup validation rules.
export const TEST_PASSWORD = "Test1234!";

// Maps a username to the user's id, so other seed files can refer to users by name.
export type UserIds = Record<string, string>;

type SeedUser = {
  username: string;
  name: string;
  email: string;
  country: string;
  birthday: string; // YYYY-MM-DD
};

const users: SeedUser[] = [
  {
    username: "alice",
    name: "Alice Test",
    email: "alice@pit.test",
    country: "NL",
    birthday: "1998-04-12",
  },
  {
    username: "bob",
    name: "Bob Test",
    email: "bob@pit.test",
    country: "BE",
    birthday: "1995-09-30",
  },
  {
    username: "charlie",
    name: "Charlie Test",
    email: "charlie@pit.test",
    country: "DE",
    birthday: "2000-01-05",
  },
  {
    username: "dana",
    name: "Dana Test",
    email: "dana@pit.test",
    country: "FR",
    birthday: "1997-06-21",
  },
  {
    username: "eve",
    name: "Eve Test",
    email: "eve@pit.test",
    country: "ES",
    birthday: "1999-11-11",
  },
];

export async function seedUsers(prisma: PrismaClient): Promise<UserIds> {
  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);
  const ids: UserIds = {};

  for (const u of users) {
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
