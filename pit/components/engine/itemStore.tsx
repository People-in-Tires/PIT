"use client";

import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface Position {
  container: string;
  x: number;
  y: number;
  invSlot?: number;
}

export interface Item extends Position {
  id: number;
  type: string;
  width: number;
  height: number;
  handle?: string;
  sprite?: string;
}

interface ItemStore {
  items: Item[];
  nextId: number;

  add: (item: Omit<Item, "id">) => number;
  move: (id: number, position: Position) => void;
  update: (
    id: number,
    patch: Partial<Omit<Item, "id" | keyof Position>>,
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
  move: (id, position) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...position } : item,
      ),
    })),
  update: (id, patch) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...patch, id: item.id } : item,
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
export function useItemsState(container: string) {
  return useItemStore
    .getState()
    .items.filter((item) => item.container === container);
}

export default useItemStore;
