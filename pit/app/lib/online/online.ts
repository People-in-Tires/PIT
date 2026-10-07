export const HEARTBEAT_INTERVAL_MS = 30000;
export const ONLINE_WINDOW_MS = 2 * 60000;

export function isOnline(lastSeenAt: Date | null): boolean {
  return (
    lastSeenAt !== null && Date.now() - lastSeenAt.getTime() < ONLINE_WINDOW_MS
  );
}
