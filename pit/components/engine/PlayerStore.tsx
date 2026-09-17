"use client";

import { create } from "zustand";

export interface IPlayer {
  drunk: number;
}

interface PlayerStore {
  player: IPlayer;

  // init from database
  // save to database
}

const useCarStore = create<PlayerStore>((set) => ({
  player: { drunk: 0 },

  // functions
}));
