"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface IPlayer {
  drunk: number;
}

interface PlayerStore {
  player: IPlayer;
  update: (patch: Partial<IPlayer>) => void;
  crementDrunk: (amount?: number) => number;
}

const usePlayerStore = create<PlayerStore>()(
  subscribeWithSelector((set, get) => ({
    player: { drunk: 0 },

    update: (patch) => {
      set((state) => ({ player: { ...state.player, ...patch } }));
    },
    crementDrunk: (amount = +1) => {
      let newDrunkLevel = get().player.drunk + amount;
      if (newDrunkLevel > 100) newDrunkLevel = 100;
      if (newDrunkLevel < 0) newDrunkLevel = 0;
      set((state) => ({ player: { ...state.player, drunk: newDrunkLevel } }));
      return newDrunkLevel;
    },
  }))
);

export default usePlayerStore;