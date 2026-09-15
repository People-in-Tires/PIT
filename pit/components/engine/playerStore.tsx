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
  incrementDrunk: () => number;
  decrementDrunk: () => number;
}

const usePlayerStore = create<PlayerStore>((set, get) => ({
  player: { drunk: 0 },

  update: (patch) => {
    (set((state) => ({
      player: { ...state.player, ...patch },
    })),
      console.log("updated: ", patch));
  },
  incrementDrunk: () => {
    const newDrunkLevel = get().player.drunk + 1;
    set((state) => ({
      player: { ...state.player, newDrunkLevel },
    }));
    return newDrunkLevel;
  },
  decrementDrunk: () => {
    const newDrunkLevel = get().player.drunk + 1;
    if (newDrunkLevel < 0) newDrunkLevel = 0;
    set((state) => ({
      player: { ...state.player, newDrunkLevel },
    }));
    return newDrunkLevel;
  },
}));

export default usePlayerStore;
