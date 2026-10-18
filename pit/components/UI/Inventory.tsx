"use client";

import styles from "@/css/Game.module.css";
import RenderItem from "@/components/engine/RenderItem";
import React, { useEffect } from "react";
import { useItems } from "@/components/engine/itemStore";
import useItemStore from "@/components/engine/itemStore";
import {
  action,
  ContainerStopHandler,
  registerStopHandler,
  unregisterStopHandler,
} from "@/components/engine/itemHandlerRegistry";

const SLOT_COUNT = 10;

export default function Inventory({
  slots = 10,
  size = 0.75,
  width = 100,
}: {
  slots?: number;
  size?: number;
  width?: number;
}) {
  const tag = "inventory";
  const items = useItems(tag);

  function putItemInInventory({
    id,
    clientX,
    clientY,
    containerElement,
  }: ContainerStopHandler): action {
    const move = useItemStore.getState().move;

    function nearestFreeSlot(hoveredSlot: number) {
      const allItems = useItemStore.getState().items;
      const occupiedSlots = new Set(
        allItems.filter((item) => item.id !== id).map((item) => item.invSlot),
      );
      for (let distance = 0; distance < SLOT_COUNT; distance++) {
        const right = hoveredSlot + distance;
        if (right < SLOT_COUNT && !occupiedSlots.has(right)) return right;
        const left = hoveredSlot - distance;
        if (left >= 0 && !occupiedSlots.has(left)) return left;
      }
      return -1;
    }

    const stack = document.elementsFromPoint(clientX, clientY);
    const slotEl = stack.find(
      (el) => (el as HTMLElement).dataset?.slot !== undefined,
    ) as HTMLElement | undefined;
    if (!slotEl) return action.fallback;

    const slotIndex = Number(slotEl.dataset.slot);
    const targetIndex = nearestFreeSlot(slotIndex);
    if (targetIndex === -1) return action.fallback;

    move(id, { container: tag, x: 0, y: 0, invSlot: targetIndex });
    return action.done;
  }

  useEffect(() => {
    registerStopHandler<ContainerStopHandler>(tag, putItemInInventory);

    return () => unregisterStopHandler(tag);
  }, []);

  return (
    <React.Fragment>
      {Array.from({ length: SLOT_COUNT }).map((_, i) => (
        <div
          data-container={tag}
          key={i}
          data-slot={i}
          className={styles.slot}
          style={{
            width: `${(width / slots) * size}vw`,
            height: `${(width / slots) * size}vw`,
          }}
        >
          {items
            .filter((item) => item.invSlot === i)
            .map((item) => (
              <RenderItem key={item.id} item={item} />
            ))}
        </div>
      ))}
    </React.Fragment>
  );
}
