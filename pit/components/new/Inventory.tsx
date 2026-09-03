"use client";

import styles from "@/css/Game.module.css";
import RenderItem from "@/components/new/RenderItem";
import { useEffect } from "react";
import { useItems } from "@/components/new/itemStore";
import useItemStore from "@/components/new/itemStore";
import {
  registerDropHandler,
  unregisterDropHandler,
  toLocalCoords,
} from "@/shared/dropRegistry";
import { SLOT_COUNT, SLOT_SIZE, SLOT_GAP } from "@/shared/inventoryConfig";

export default function Inventory() {
  const items = useItems("inventory");

  useEffect(() => {
    registerDropHandler(
      "inventory",
      ({ id, clientX, clientY, containerEl }) => {
        const move = useItemStore.getState().move;

        function nearestFreeSlot(hoveredSlot: number) {
          const allItems = useItemStore.getState().items;
          // allItems.forEach((value) => console.log(value))
          const occupiedSlots = new Set(
            allItems
              .filter((item) => item.id !== id)
              .map((item) => item.invSlot),
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
        if (!slotEl) return false;

        const slotIndex = Number(slotEl.dataset.slot);
        let targetEl = slotEl;
        const targetIndex = nearestFreeSlot(slotIndex);
        if (targetIndex === -1) return false;

        if (targetIndex !== slotIndex)
          targetEl = containerEl.querySelector(
            `[data-slot="${targetIndex}"]`,
          ) as HTMLElement;
        const targetRect = targetEl.getBoundingClientRect();

        const { x, y } = toLocalCoords(
          containerEl,
          targetRect.left,
          targetRect.top,
        );
        move(id, "inventory", x, y, targetIndex);
        return true;
      },
    );

    return () => unregisterDropHandler("inventory");
  }, []);

  return (
    <div
      data-container="inventory"
      style={{
        position: "absolute",
        bottom: "5%",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: SLOT_GAP,
      }}
    >
      {Array.from({ length: SLOT_COUNT }).map((_, i) => (
        <div
          key={i}
          data-slot={i}
          className={styles.inventory}
          style={{ width: SLOT_SIZE, height: SLOT_SIZE, position: "relative" }}
        />
      ))}
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
