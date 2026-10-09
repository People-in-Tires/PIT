"use client";

import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { ItemType } from "./RenderItem";
import { itemRegistry } from "./itemRegistry";

export interface Position {
  container: string;
  x: number;
  y: number;
  invSlot?: number;
}

export interface Item extends Position {
  id: number;
  type: ItemType;
  height: number;
  width: number;
  aspectRatio?: number;
  handle?: string;
  sprites?: string[];
  angle?: number;
  tightenedPer?: number;
  fullness?: number;
  fluid_cap?: number;
  attachedTo?: Element | boolean;
  disabled?: boolean;
  className?: string;
  dragging?: boolean;
  pickedup?: boolean;
  wear?: number; //0-100
}

interface ItemStore {
  items: Item[];
  nextId: number;

  add: (item: Omit<Item, "id">) => number;
  create: (item: Omit<Item, "id" | "width" | "height" | "x" | "y">) => number;
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
  create: (item) => {
    let id = -1;
    const item_template = itemRegistry[item.type];
    set((state) => {
      id = state.nextId;
      return {
        items: [...state.items, { ...item_template, ...item, id: id }],
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
