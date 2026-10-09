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
  questions: { question: string; answer: string }[];
};

const users: SeedUser[] = [
  {
    username: "alice",
    name: "Alice Test",
    email: "alice@pit.test",
    country: "NL",
    birthday: "1998-04-12",
    questions: [
      { question: "What was the name of your first pet?", answer: "Pixel" },
      { question: "In which city were you born?", answer: "Amsterdam" },
    ],
  },
  {
    username: "bob",
    name: "Bob Test",
    email: "bob@pit.test",
    country: "BE",
    birthday: "1995-09-30",
    questions: [
      { question: "What was the name of your first pet?", answer: "Rex" },
      { question: "In which city were you born?", answer: "Gent" },
    ],
  },
  {
    username: "charlie",
    name: "Charlie Test",
    email: "charlie@pit.test",
    country: "DE",
    birthday: "2000-01-05",
    questions: [
      { question: "What was the name of your first pet?", answer: "Bello" },
      { question: "In which city were you born?", answer: "Berlin" },
    ],
  },
  {
    username: "dana",
    name: "Dana Test",
    email: "dana@pit.test",
    country: "FR",
    birthday: "1997-06-21",
    questions: [
      { question: "What was the name of your first pet?", answer: "Minou" },
      { question: "In which city were you born?", answer: "Lyon" },
    ],
  },
  {
    username: "eve",
    name: "Eve Test",
    email: "eve@pit.test",
    country: "ES",
    birthday: "1999-11-11",
    questions: [
      { question: "What was the name of your first pet?", answer: "Luna" },
      { question: "In which city were you born?", answer: "Madrid" },
    ],
  },
];

export async function seedUsers(prisma: PrismaClient): Promise<UserIds> {
  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);
  const ids: UserIds = {};

  for (const u of users) {
    // Answers are normalized to lowercase before hashing, just like signup.
    const questions = await Promise.all(
      u.questions.map(async (q) => ({
        question: q.question,
        answerHash: await bcrypt.hash(q.answer.toLowerCase(), 10),
      })),
    );

    // upsert: create the user if the email doesn't exist yet, otherwise leave it alone.
    // The security questions are only created together with a new user,
    // so running the seed twice doesn't give anyone four questions.
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        username: u.username,
        name: u.name,
        email: u.email,
        country: u.country,
        birthday: new Date(u.birthday),
        passwordHash,
        questions: { create: questions },
      },
    });

    ids[u.username] = user.id;
  }

  return ids;
}
