"use client";

import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { ItemType } from "./RenderItem";

interface Position {
  container: string;
  x: number;
  y: number;
  invSlot?: number;
}

export interface Item extends Position {
  id: number;
  type: ItemType;
  height: number;
  width?: number;
  aspectRatio?: number;
  handle?: string;
  sprites?: string[];
  angle?: number;
  tightenedPer?: number;
  fullness?: number;
  fluid_cap?: number;
  attachedTo?: Element;
  disabled?: boolean;
  className?: string;
  dragging?: boolean;
  pickedup?: boolean;
}

export const itemRegistry: Record<ItemType, Item> = {
  beer: {
    id: -1,
    type: "beer",
    aspectRatio: 1 / 5,
    height: 10,
    container: "",
    x: 0,
    y: 0,
  },
  normalwheel: {
    id: -1,
    type: "normalwheel",
    aspectRatio: 1 / 1,
    height: 10,
    container: "",
    x: 0,
    y: 0,
  },
  wetwheel: {
    id: -1,
    type: "wetwheel",
    aspectRatio: 8 / 1,
    height: 4,
    container: "",
    x: 0,
    y: 0,
    angle: 90,
  },
  hardwheel: {
    id: -1,
    type: "hardwheel",
    aspectRatio: 1 / 1,
    height: 10,
    container: "",
    x: 0,
    y: 0,
  },
  softwheel: {
    id: -1,
    type: "softwheel",
    aspectRatio: 1 / 2,
    height: 10,
    container: "",
    x: 0,
    y: 0,
  },
  wrench: {
    id: -1,
    type: "wrench",
    aspectRatio: 1 / 4,
    height: 10,
    container: "",
    x: 0,
    y: 0,
    handle: "#handle",
  },
  jerrycan: {
    id: -1,
    type: "jerrycan",
    aspectRatio: 2 / 3,
    height: 10,
    container: "",
    x: 0,
    y: 0,
    fullness: 20000,
    fluid_cap: 20000,
  },
  litter: {
    id: -1,
    type: "litter",
    aspectRatio: 1 / 1,
    height: 3,
    container: "",
    x: 0,
    y: 0,
  },
};

interface ItemStore {
  items: Item[];
  nextId: number;

  add: (item: Omit<Item, "id">) => number;
  create: (itemtype: ItemType, container: string) => number;
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
  create: (itemtype, container) => {
    let id = -1;
    const item_template = itemRegistry[itemtype];
    set((state) => {
      id = state.nextId;
      return {
        items: [...state.items, { ...item_template, id, container }],
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
