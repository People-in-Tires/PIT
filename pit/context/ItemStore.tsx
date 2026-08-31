'use client'

import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow';
import { useRef } from 'react';
import { ItemProps } from '@/components/item';
import './itemStore.css'

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

function useItems(container: string) {
  return useItemStore(
    useShallow((state) =>
      state.registry
        .filter((entry) => entry.container === container)
        .filter(Boolean) as ItemProps[])
  );
}
function ItemStacks() {
  const items = useItemStore((state) => state.items)
  const registry = useItemStore((s) => s.registry);
  const add = useItemStore((s) => s.add);
  const move = useItemStore((s) => s.move);
  const remove = useItemStore((s) => s.remove);

  const nextId = useRef(1);

  const createItem = () => {
    add(
      {
        id: nextId.current++,
        x: 0,
        y: 0,
        width: 80,
        height: 40,
      },
      "stack1"
    );
  };

  const stack1Items = useItems("stack1");

  const stack2Items = useItems("stack2");

  return (
    <div>
      <button onClick={createItem}>Create Item</button>

      <div className="stacks">
        <div className="stack">
          <h3>Stack 1</h3>

          {stack1Items.map((item) => (
            <div key={item.id} className="item-box">
              #{item.id}

              <button onClick={() => move(item.id, "stack2")}>
                →
              </button>
            </div>
          ))}
        </div>

        <div className="stack">
          <h3>Stack 2</h3>

          {stack2Items.map((item) => (
            <div key={item.id} className="item-box">
              #{item.id}

              <button onClick={() => move(item.id, "stack1")}>
                ←
              </button>

              <button onClick={() => remove(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemStacks;
