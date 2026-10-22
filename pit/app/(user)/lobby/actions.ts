"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { Prisma } from "@/generated/prisma";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import {
  CreateLobbySchema,
  UpdateSettingsSchema,
  type ActionResult,
  type FriendStatus,
  type LobbyFormState,
  type LobbyState,
} from "./definitions";

async function currentUserId() {
  const session = await auth();
  return session?.user?.id ?? null;
}

function isUniqueViolation(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

export async function getLobbyState(): Promise<LobbyState | null> {
  const me = await currentUserId();
  if (!me) return null;

  const membership = await prisma.lobbyMember.findUnique({
    where: { userId: me },
    include: {
      lobby: {
        include: {
          members: {
            orderBy: { joinedAt: "asc" },
            include: {
              user: { select: { id: true, username: true, image: true } },
            },
          },
        },
      },
    },
  });

  if (!membership) {
    const lobbies = await prisma.lobby.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
      include: {
        leader: { select: { username: true } },
        _count: { select: { members: true } },
      },
    });
    return {
      userId: me,
      lobby: null,
      publicLobbies: lobbies.map((l) => ({
        id: l.id,
        name: l.name,
        leaderName: l.leader.username,
        playerCount: l._count.members,
        maxPlayers: l.maxPlayers,
        cpuTeams: l.cpuTeams,
        started: l.started,
      })),
    };
  }

  const lobby = membership.lobby;
  const otherIds = lobby.members.map((m) => m.userId).filter((id) => id !== me);

  const [friends, sent, received] = await Promise.all([
    prisma.friend.findMany({
      where: { userId: me, friendId: { in: otherIds } },
      select: { friendId: true },
    }),
    prisma.friendRequest.findMany({
      where: { requesterId: me, receiverId: { in: otherIds } },
      select: { receiverId: true },
    }),
    prisma.friendRequest.findMany({
      where: { receiverId: me, requesterId: { in: otherIds } },
      select: { requesterId: true },
    }),
  ]);

  const statusByUser = new Map<string, FriendStatus>();
  for (const r of received) statusByUser.set(r.requesterId, "received");
  for (const r of sent) statusByUser.set(r.receiverId, "sent");
  for (const f of friends) statusByUser.set(f.friendId, "friends");

  return {
    userId: me,
    publicLobbies: [],
    lobby: {
      id: lobby.id,
      name: lobby.name,
      isPublic: lobby.isPublic,
      maxPlayers: lobby.maxPlayers,
      cpuTeams: lobby.cpuTeams,
      leaderId: lobby.leaderId,
      started: lobby.started,
      members: lobby.members.map((m) => ({
        userId: m.userId,
        username: m.user.username,
        image: m.user.image,
        isLeader: m.userId === lobby.leaderId,
        ready: m.userId === lobby.leaderId || m.ready,
        friendStatus: statusByUser.get(m.userId) ?? "none",
      })),
    },
  };
}

export async function createLobby(
  _prevState: LobbyFormState,
  formData: FormData,
): Promise<LobbyFormState> {
  const me = await currentUserId();
  if (!me) return { message: "You need to be logged in." };

  const raw = {
    name: formData.get("name"),
    maxPlayers: formData.get("maxPlayers"),
    visibility: formData.get("visibility"),
    cpuTeams: formData.get("cpuTeams") === "on",
    password: String(formData.get("password") ?? ""),
  };
  const values = {
    name: String(raw.name ?? ""),
    maxPlayers: String(raw.maxPlayers ?? ""),
    cpuTeams: raw.cpuTeams,
  };

  const validated = CreateLobbySchema.safeParse(raw);
  if (!validated.success) {
    return { errors: z.flattenError(validated.error).fieldErrors, values };
  }
  const { name, maxPlayers, visibility, cpuTeams, password } = validated.data;

  if (await prisma.lobbyMember.findUnique({ where: { userId: me } })) {
    return { message: "You're already in a lobby. Leave it first.", values };
  }

  const nameTaken = await prisma.lobby.findFirst({
    where: { name: { equals: name, mode: "insensitive" } },
    select: { id: true },
  });
  if (nameTaken) {
    return { errors: { name: ["That lobby name is taken. "] }, values };
  }

  const isPublic = visibility === "public";
  try {
    await prisma.lobby.create({
      data: {
        name,
        maxPlayers,
        cpuTeams,
        isPublic,
        passwordHash: isPublic ? null : await bcrypt.hash(password, 10),
        leaderId: me,
        members: { create: { userId: me, ready: true } },
      },
    });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        message: "Couldn't create the lobby, please try again.",
        values,
      };
    }
    throw error;
  }

  return { timestamp: Date.now() };
}

async function addMember(me: string, lobbyId: string): Promise<string | null> {
  try {
    return await prisma.$transaction(async (tx) => {
      const lobby = await tx.lobby.findUnique({
        where: { id: lobbyId },
        include: { _count: { select: { members: true } } },
      });
      if (!lobby) return "That lobby no longer exists.";
      if (lobby._count.members >= lobby.maxPlayers)
        return "That lobby is full.";
      await tx.lobbyMember.create({ data: { lobbyId, userId: me } });
      return null;
    });
  } catch (error) {
    if (isUniqueViolation(error)) return "You're already in a lobby.";
    throw error;
  }
}

export async function joinPublicLobby(lobbyId: string): Promise<ActionResult> {
  const me = await currentUserId();
  if (!me) return { error: "You need to be logged in." };

  const lobby = await prisma.lobby.findUnique({
    where: { id: lobbyId },
    select: { isPublic: true },
  });
  if (!lobby) return { error: "That lobby no longer exists." };
  if (!lobby.isPublic) return { error: "That lobby is private." };

  const error = await addMember(me, lobbyId);
  return error ? { error } : {};
}

export async function joinPrivateLobby(
  _prevState: LobbyFormState,
  formData: FormData,
): Promise<LobbyFormState> {
  const me = await currentUserId();
  if (!me) return { message: "You need to be logged in." };

  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!name || !password) {
    return { message: "Enter the lobby name and password.", values: { name } };
  }

  const lobby = await prisma.lobby.findFirst({
    where: { name: { equals: name, mode: "insensitive" }, isPublic: false },
  });
  const ok =
    lobby?.passwordHash && (await bcrypt.compare(password, lobby.passwordHash));
  if (!lobby || !ok) {
    return { message: "Wrong lobby name or password.", values: { name } };
  }

  const error = await addMember(me, lobby.id);
  if (error) return { message: error, values: { name } };
  return { timestamp: Date.now() };
}

export async function leaveLobby(): Promise<ActionResult> {
  const me = await currentUserId();
  if (!me) return {};

  await prisma.$transaction(async (tx) => {
    const membership = await tx.lobbyMember.findUnique({
      where: { userId: me },
      include: { lobby: { select: { leaderId: true } } },
    });
    if (!membership) return;

    await tx.lobbyMember.delete({ where: { userId: me } });
    if (membership.lobby.leaderId !== me) return;

    const next = await tx.lobbyMember.findFirst({
      where: { lobbyId: membership.lobbyId },
      orderBy: { joinedAt: "asc" },
    });
    if (!next) {
      await tx.lobby.delete({ where: { id: membership.lobbyId } });
    } else {
      await tx.lobby.update({
        where: { id: membership.lobbyId },
        data: { leaderId: next.userId },
      });
      await tx.lobbyMember.update({
        where: { userId: next.userId },
        data: { ready: true },
      });
    }
  });
  return {};
}

export async function toggleReady(): Promise<ActionResult> {
  const me = await currentUserId();
  if (!me) return {};

  const membership = await prisma.lobbyMember.findUnique({
    where: { userId: me },
    include: { lobby: { select: { leaderId: true } } },
  });
  if (!membership || membership.lobby.leaderId === me) return {};

  await prisma.lobbyMember.update({
    where: { userId: me },
    data: { ready: !membership.ready },
  });
  return {};
}

export async function kickPlayer(targetId: string): Promise<ActionResult> {
  const me = await currentUserId();
  if (!me || targetId === me) return {};

  const lobby = await prisma.lobby.findFirst({
    where: { leaderId: me, members: { some: { userId: targetId } } },
    select: { id: true },
  });
  if (!lobby)
    return { error: "You can only kick players from your own lobby." };

  await prisma.lobbyMember.deleteMany({
    where: { userId: targetId, lobbyId: lobby.id },
  });
  return {};
}

export async function updateSettings(
  _prevState: LobbyFormState,
  formData: FormData,
): Promise<LobbyFormState> {
  const me = await currentUserId();
  if (!me) return { message: "You need to be logged in." };

  const lobby = await prisma.lobby.findFirst({
    where: { leaderId: me },
    include: { _count: { select: { members: true } } },
  });
  if (!lobby) return { message: "Only the lobby leader can change settings." };

  const validated = UpdateSettingsSchema.safeParse({
    maxPlayers: formData.get("maxPlayers"),
    visibility: formData.get("visibility"),
    cpuTeams: formData.get("cpuTeams") === "on",
    password: String(formData.get("password") ?? ""),
  });
  if (!validated.success) {
    return { errors: z.flattenError(validated.error).fieldErrors };
  }
  const { maxPlayers, visibility, cpuTeams, password } = validated.data;

  if (maxPlayers < lobby._count.members) {
    return {
      errors: {
        maxPlayers: [
          `There are already ${lobby._count.members} players in this lobby. `,
        ],
      },
    };
  }

  const isPublic = visibility === "public";
  let passwordHash: string | null = null;
  if (!isPublic) {
    if (password) passwordHash = await bcrypt.hash(password, 10);
    else if (lobby.passwordHash)
      passwordHash = lobby.passwordHash; // keep
    else {
      return {
        errors: { password: ["A private lobby needs a password. "] },
      };
    }
  }

  const changed =
    maxPlayers !== lobby.maxPlayers ||
    isPublic !== lobby.isPublic ||
    cpuTeams !== lobby.cpuTeams ||
    password.length > 0;

  await prisma.$transaction(async (tx) => {
    await tx.lobby.update({
      where: { id: lobby.id },
      data: { maxPlayers, isPublic, cpuTeams, passwordHash },
    });
    if (changed) {
      await tx.lobbyMember.updateMany({
        where: { lobbyId: lobby.id, userId: { not: me } },
        data: { ready: false },
      });
    }
  });

  return { success: "Settings saved.", timestamp: Date.now() };
}

export async function sendFriendRequest(
  targetId: string,
): Promise<ActionResult> {
  const me = await currentUserId();
  if (!me || targetId === me) return {};

  const [mine, theirs] = await Promise.all([
    prisma.lobbyMember.findUnique({ where: { userId: me } }),
    prisma.lobbyMember.findUnique({ where: { userId: targetId } }),
  ]);
  if (!mine || !theirs || mine.lobbyId !== theirs.lobbyId) {
    return { error: "You can only add players from your lobby." };
  }

  const existing = await prisma.friend.findUnique({
    where: { userId_friendId: { userId: me, friendId: theirs.userId } },
  });
  if (existing) return {};

  const sent = await prisma.friendRequest.findUnique({
    where: {
      requesterId_receiverId: { requesterId: me, receiverId: theirs.userId },
    },
  });
  if (sent) return {};

  const received = await prisma.friendRequest.findUnique({
    where: {
      requesterId_receiverId: { receiverId: me, requesterId: theirs.userId },
    },
  });
  if (received) {
    await prisma.$transaction([
      prisma.friendRequest.delete({
        where: {
          requesterId_receiverId: {
            requesterId: theirs.userId,
            receiverId: me,
          },
        },
      }),
      prisma.friend.createMany({
        data: [
          { userId: me, friendId: theirs.userId },
          { userId: theirs.userId, friendId: me },
        ],
      }),
    ]);
    return {};
  }

  await prisma.friendRequest.create({
    data: { requesterId: me, receiverId: targetId },
  });
  return {};
}
