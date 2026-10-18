import * as z from "zod";

const nameField = z
  .string()
  .trim()
  .min(3, { error: "Lobby name must be at least 3 characters long. " })
  .max(30, { error: "Lobby name can be at most 30 characters long. " });

const maxPlayersField = z.coerce
  .number({ error: "Enter a number between 1 and 8. " })
  .int({ error: "Enter a whole number between 1 and 8. " })
  .min(1, { error: "A lobby needs room for at least 1 player. " })
  .max(8, { error: "A lobby can have at most 8 players. " });

const visibilityField = z.enum(["public", "private"], {
  error: "Choose public or private. ",
});

const passwordField = z
  .string()
  .max(72, { error: "Password can be at most 72 characters long. " }); // bcrypt limit

export const CreateLobbySchema = z
  .object({
    name: nameField,
    maxPlayers: maxPlayersField,
    visibility: visibilityField,
    cpuTeams: z.boolean(),
    password: passwordField,
  })
  .refine((d) => d.visibility === "public" || d.password.length >= 4, {
    error: "A private lobby needs a password of at least 4 characters. ",
    path: ["password"],
  });

// Password may be empty here: "keep the current password" is checked in the action
export const UpdateSettingsSchema = z
  .object({
    maxPlayers: maxPlayersField,
    visibility: visibilityField,
    cpuTeams: z.boolean(),
    password: passwordField,
  })
  .refine((d) => d.password.length === 0 || d.password.length >= 4, {
    error: "A password needs at least 4 characters. ",
    path: ["password"],
  });

export type LobbyFormState =
  | {
      errors?: {
        name?: string[];
        maxPlayers?: string[];
        visibility?: string[];
        password?: string[];
      };
      values?: { name?: string; maxPlayers?: string; cpuTeams?: boolean };
      message?: string;
      success?: string;
      timestamp?: number;
    }
  | undefined;

export type ActionResult = { error?: string };

export type FriendStatus = "none" | "friends" | "sent" | "received";

export type LobbyMemberView = {
  userId: string;
  username: string;
  image: string | null;
  ready: boolean; // the leader always counts as ready
  isLeader: boolean;
  friendStatus: FriendStatus;
};

export type LobbyView = {
  id: string;
  name: string;
  isPublic: boolean;
  maxPlayers: number;
  cpuTeams: boolean;
  leaderId: string;
  members: LobbyMemberView[];
};

export type LobbyListItem = {
  id: string;
  name: string;
  leaderName: string;
  playerCount: number;
  maxPlayers: number;
  cpuTeams: boolean;
};

export type LobbyState = {
  userId: string;
  lobby: LobbyView | null;
  publicLobbies: LobbyListItem[]; // only filled when you're not in a lobby
};
