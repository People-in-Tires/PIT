export interface Achievements {
  id: number;
  name: string;
  description: string;
}

export interface UserAchievement {
  id: number;

  userId: number;
  achievementId: number;

  unlockedAt: Date;
}
