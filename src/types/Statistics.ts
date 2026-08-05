export interface Statistics {
  userId: number;

  matchesPlayed: number;
  wins: number;
  losses: number;

  totalPitStops: number;
  perfectPitStops: number;
  fastestPitStopTime: number;

  totalCrashes: number;
}
