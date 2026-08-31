"use client";

import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { ItemProps } from "@/components/item";

interface InternalItemProps extends ItemProps {
  id: number;
  container: string;
}

interface ItemStore {
  items: InternalItemProps[];
  nextId: number;

  add: (item: ItemProps, container: string) => void;
  move: (id: number, container: string) => void;
  remove: (id: number) => void;
}

const useItemStore = create<ItemStore>((set) => ({
  items: [],
  nextId: 0,

  add: (item, container) =>
    set((state) => {
      const id = state.nextId;
      return {
        items: [...state.items, { ...item, id, container }],
        nextId: state.nextId + 1,
      };
    }),
  move: (id, container) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, container }
          : item,
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
