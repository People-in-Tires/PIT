import NextAuth from "next-auth";
import FortyTwoSchool from "next-auth/providers/42-school";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import GitHub from "next-auth/providers/github";

const baseAdapter = PrismaAdapter(prisma);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: {
    ...baseAdapter,
    createUser: async () => {
      throw new Error("OAuth signup disabled: create an account first");
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/login", error: "/login" },
  providers: [
    FortyTwoSchool,
    GitHub,
    Credentials({
      credentials: {
        login: { label: "Username or email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const login = credentials?.login as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!login || !password) return null;

        const user = await prisma.user.findFirst({
          where: { OR: [{ email: login.toLowerCase() }, { username: login }] },
        });
        if (!user || !user.passwordHash) return null;

        const passwordCorrect = await bcrypt.compare(
          password,
          user.passwordHash,
        );
        if (!passwordCorrect) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/profile`;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = (user as { username?: string | null }).username;

        await prisma.user.update({
          where: { id: user.id },
          data: { isOnline: true },
        });
      }

      if (!token.id) {
        return null;
      }

      const stillExists = await prisma.user.findUnique({
        where: { id: token.id as string },
        select: { id: true },
      });

      if (!stillExists) {
        return null; //hiermee wordt de sessie ongeldig gemaakt en de cookie opgeruimd
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { username?: string | null }).username =
          token.username as string | null;
      }
      return session;
    },
  },
  events: {
    async signOut(message) {
      const id =
        "token" in message
          ? (message.token?.id as string | undefined)
          : undefined;
      if (id) {
        await prisma.user
          .update({ where: { id }, data: { isOnline: false } })
          .catch(() => null); //voor als user al verwijderd is
      }
    },
  },
});
