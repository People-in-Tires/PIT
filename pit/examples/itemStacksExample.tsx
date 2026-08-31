'use client'

import useItemStore, { useItems } from '@/context/itemStore';
import { useRef } from 'react';

import './itemStacksExample.css'

function ItemStacks() {
  const items = useItemStore((state) => state.items)
  const add = useItemStore((s) => s.add);
  const move = useItemStore((s) => s.move);
  const remove = useItemStore((s) => s.remove);

  const createItem = () => {
    add(
      {
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
