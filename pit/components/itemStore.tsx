"use client";

import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

export interface Item {
  id: number;
  type: string;
  container: string;
  x: number;
  y: number;
  width: number;
  height: number;
  invSlot?: number;
}

interface ItemStore {
  items: Item[];
  nextId: number;

  add: (item: Omit<Item, "id">) => number;
  move: (
    id: number,
    container: string,
    x: number,
    y: number,
    invSlot?: number,
  ) => void;
  remove: (id: number) => void;
}

const useItemStore = create<ItemStore>((set) => ({
  items: [],
  nextId: 0,

  add: (item) => {
    let id = -1;
    set((state) => {
      id = state.nextId;
      return {
        items: [...state.items, { ...item, id }],
        nextId: state.nextId + 1,
      };
    });
    return id;
  },
  move: (id, container, x, y, invSlot) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, container, x, y, invSlot } : item,
      ),
    })),
  remove: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));

export function useItems(container: string) {
  return useItemStore(
    useShallow((state) =>
      state.items.filter((item) => item.container === container),
    ),
  );
}

export default useItemStore;
