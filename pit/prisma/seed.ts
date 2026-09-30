// prisma/seed.ts
// Fills the database with a few test users so you don't have to sign up by hand.
// Run with: npx prisma db seed

import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, FriendshipStatus } from "../generated/prisma";

// The seed runs as a standalone script, outside Next.js,
// so it creates its own client instead of importing the app's one.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Same password for every test user, so it's easy to remember.
// Make sure it passes your own signup validation rules.
const TEST_PASSWORD = "Test1234!";

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

async function seedUsers() {
  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);
  const idByUsername: Record<string, string> = {};

  for (const u of users) {
    // Answers are normalized to lowercase before hashing, just like signup.
    const questions = await Promise.all(
      u.questions.map(async (q) => ({
        question: q.question,
        answerHash: await bcrypt.hash(q.answer.toLowerCase(), 10),
      }))
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

    idByUsername[u.username] = user.id;
  }

  return idByUsername;
}

async function seedFriendships(ids: Record<string, string>) {
  // alice <-> bob: already friends
  await prisma.friendship.upsert({
    where: {
      requesterId_receiverId: { requesterId: ids.alice, receiverId: ids.bob },
    },
    update: {},
    create: {
      requesterId: ids.alice,
      receiverId: ids.bob,
      status: FriendshipStatus.ACCEPTED,
      acceptedAt: new Date(),
    },
  });

  // charlie -> alice: pending, so alice sees a request in her notification bell
  await prisma.friendship.upsert({
    where: {
      requesterId_receiverId: { requesterId: ids.charlie, receiverId: ids.alice },
    },
    update: {},
    create: {
      requesterId: ids.charlie,
      receiverId: ids.alice,
      status: FriendshipStatus.PENDING,
    },
  });
}

async function main() {
  const ids = await seedUsers();
  await seedFriendships(ids);
  console.log(`Seeded ${users.length} users (password: ${TEST_PASSWORD})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });