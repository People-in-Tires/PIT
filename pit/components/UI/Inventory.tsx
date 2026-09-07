"use client";

import styles from "@/css/Game.module.css";
import RenderItem from "@/components/engine/RenderItem";
import { useEffect } from "react";
import { useItems } from "@/components/engine/itemStore";
import useItemStore from "@/components/engine/itemStore";
import {
  ContainerStopHandler,
  registerStopHandler,
  unregisterStopHandler,
} from "@/components/engine/itemHandlerRegistry";
import { toLocalCoords } from "../engine/itemHandlerHelpers";
import {
  SLOT_COUNT,
  SLOT_SIZE,
  SLOT_GAP,
} from "@/components/engine/inventoryConfig";

export default function Inventory() {
  const tag = "inventory";
  const items = useItems(tag);

  useEffect(() => {
    registerStopHandler<ContainerStopHandler>(
      tag,
      ({ id, clientX, clientY, containerElement: containerEl }) => {
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
        if (!slotEl) return true;

        const slotIndex = Number(slotEl.dataset.slot);
        let targetEl = slotEl;
        const targetIndex = nearestFreeSlot(slotIndex);
        if (targetIndex === -1) return true;

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
        move(id, tag, x, y, targetIndex);
        return false;
      },
    );

    return () => unregisterStopHandler(tag);
  }, []);

  return (
    <div
      data-container={tag}
      style={{
        position: "absolute",
        bottom: "5%",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: SLOT_GAP,
      }}
      // classname inventory
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
