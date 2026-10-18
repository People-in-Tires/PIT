import type { getPendingFriendRequests } from "./data";

export type FriendRequest = Awaited<
  ReturnType<typeof getPendingFriendRequests>
>[number];
