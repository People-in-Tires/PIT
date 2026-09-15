"use client";

import { create } from "zustand";

export interface IPlayer {
  drunk: number;
}

interface PlayerStore {
  player: IPlayer;

  // init from database
  // save to database
  update: (patch: Partial<IPlayer>) => void;
}

const usePlayerStore = create<PlayerStore>((set) => ({
  player: { drunk: 0 },

  update: (patch) => {
    (set((state) => ({
      player: { ...state.player, ...patch },
    })),
      console.log("updated: ", patch));
  },
}));

export default usePlayerStore;
