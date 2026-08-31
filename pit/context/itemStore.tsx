'use client'

import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow';
import { ItemProps } from '@/components/item';

interface ItemStore {
  items: ItemProps[]
  registry: {container: string, id: number}[]

  add: (item: ItemProps, container: string) => void
  move: (id: number, container: string) => void
  remove: (id: number) => void
}

const useItemStore = create<ItemStore>((set) => ({
  items: [],
  registry: [],

  add: (item, container) =>
    set((state) => ({
      items: [...state.items, item],
      registry: [...state.registry, { container, id: item.id, }]
    })),
  move: (id, container) =>
    set((state) => ({
      registry: state.registry.map((item) =>
        item.id === id
          ? { ...item, container: container}
          : item
      )
    })),
  remove: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
      registry: state.registry.filter((item) => item.id != id)
    })),
}))

export function useItems(container: string) {
  return useItemStore(
    useShallow((state) =>
      state.registry
        .filter((entry) => entry.container === container)
        .filter(Boolean) as ItemProps[])
  );
}

export default useItemStore;