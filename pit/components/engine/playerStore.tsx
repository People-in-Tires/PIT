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
  incrementDrunk: (amount?: number) => number;
  decrementDrunk: (amount?: number) => number;
}

const usePlayerStore = create<PlayerStore>((set, get) => ({
  player: { drunk: 0 },

  update: (patch) => {
    (set((state) => ({
      player: { ...state.player, ...patch },
    })),
      console.log("updated: ", patch));
  },
  incrementDrunk: (amount = 1) => {
    let newDrunkLevel = get().player.drunk + amount;
    if (newDrunkLevel > 1000) newDrunkLevel = 1000;
    set((state) => ({
      player: { ...state.player, drunk: newDrunkLevel },
    }));
    return newDrunkLevel;
  },
  decrementDrunk: (amount = 1) => {
    let newDrunkLevel = get().player.drunk + amount;
    if (newDrunkLevel < 0) newDrunkLevel = 0;
    set((state) => ({
      player: { ...state.player, drunk: newDrunkLevel },
    }));
    return newDrunkLevel;
  },
}));

export default usePlayerStore;
