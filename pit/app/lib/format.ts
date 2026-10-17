export function formatSeconds(ms: number | null): string {
  if (ms === null) return "–";
  return `${(ms / 1000).toFixed(2)}s`;
}