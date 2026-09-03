"use client";

import { useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import useItemStore from "@/components/new/itemStore";
import { getDropHandler, toLocalCoords } from "../../shared/dropRegistry";
import styles from "@/css/Game.module.css";

interface DraggableItemProps {
  id: number;
  x: number;
  y: number;
  children: React.ReactNode;
  disabled?: boolean;
}

function findContainerAt(
  clientX: number,
  clientY: number,
): { id: string; el: HTMLElement } | null {
  const stack = document.elementsFromPoint(clientX, clientY);
  for (const el of stack) {
    const container = (el as HTMLElement).dataset?.container;
    if (container) return { id: container, el: el as HTMLElement };
  }
  return null;
}

export default function DraggableItem({
  id,
  x,
  y,
  children,
  disabled,
}: DraggableItemProps) {
  const nodeRef = useRef<HTMLDivElement>(null!);
  const grabOffset = useRef({ x: 0, y: 0 });
  const move = useItemStore((state) => state.move);
  const item = useItemStore((state) => state.items.find((i) => i.id === id));

  function handleStart(e: DraggableEvent) {
    const event = e as MouseEvent;
    const rect = nodeRef.current.getBoundingClientRect();
    grabOffset.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function handleStop(e: DraggableEvent, data: DraggableData) {
    const event = e as MouseEvent;
    const hit = findContainerAt(event.clientX, event.clientY);
    const currentContainer = item?.container ?? "gameview";

    const itemClientX = event.clientX - grabOffset.current.x;
    const itemClientY = event.clientY - grabOffset.current.y;

    if (!hit) {
      move(id, currentContainer, data.x, data.y);
      // console.log(item);
      return;
    }

    const handler = getDropHandler(hit.id);
    if (handler) {
      const success = handler({
        id,
        clientX: event.clientX,
        clientY: event.clientY,
        itemClientX,
        itemClientY,
        containerEl: hit.el,
      });
      // console.log(item);
      if (success) return;
    }

    const { x: localX, y: localY } = toLocalCoords(
      hit.el,
      itemClientX,
      itemClientY,
    );
    move(id, hit.id, localX, localY);
    // console.log(item);
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x, y }}
      onStart={handleStart}
      onStop={handleStop}
      disabled={disabled}
    >
      <div
        ref={nodeRef}
        className={styles.item}
        style={{ position: "absolute" }}
      >
        {children}
      </div>
    </Draggable>
  );
}
