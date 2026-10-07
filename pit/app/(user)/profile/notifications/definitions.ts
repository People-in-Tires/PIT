export type FriendRequest = {
  id: number;
  createdAt: Date;
  requester: {
    username: string;
    image: string | null;
  };
};
