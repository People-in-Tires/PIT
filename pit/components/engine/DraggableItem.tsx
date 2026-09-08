"use client";

import { useRef, useEffect, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import useItemStore, { Item } from "@/components/engine/itemStore";
import {
  Handler,
  ContainerHandler,
  ContainerStopHandler,
  InteractableHandler,
  getStartHandler,
  getDragHandler,
  getStopHandler,
} from "./itemHandlerRegistry";
import { toLocalCoords } from "./itemHandlerHelpers";
import styles from "@/css/Game.module.css";

interface DraggableItemProps extends Item {
  children: React.ReactNode;
  disabled?: boolean;
}

export function findInteractableWithin(
  rect: DOMRect | undefined,
): { name: string; element: HTMLElement } | null {
  let interactable: { name: string; element: HTMLElement } | null;
  if (rect == undefined) return null;
  interactable = findInteractableAt(rect.left, rect.top);
  if (interactable != null) return interactable;
  interactable = findInteractableAt(rect.left, rect.bottom);
  if (interactable != null) return interactable;
  interactable = findInteractableAt(rect.right, rect.top);
  if (interactable != null) return interactable;
  interactable = findInteractableAt(rect.right, rect.bottom);
  if (interactable != null) return interactable;
  return null;
}

export function findInteractableAt(
  clientX: number,
  clientY: number,
): { name: string; element: HTMLElement } | null {
  const stack = document.elementsFromPoint(clientX, clientY);
  for (const element of stack) {
    const interactable = (element as HTMLElement).dataset?.interactable;
    if (interactable)
      return { name: interactable, element: element as HTMLElement };
  }
  return null;
}

export function findContainerAt(
  clientX: number,
  clientY: number,
): { name: string; element: HTMLElement } | null {
  const stack = document.elementsFromPoint(clientX, clientY);
  for (const element of stack) {
    const container = (element as HTMLElement).dataset?.container;
    if (container) return { name: container, element: element as HTMLElement };
  }
  return null;
}

export default function DraggableItem({
  id,
  type,
  container,
  x,
  y,
  children,
  disabled,
}: DraggableItemProps) {
  const grabOffset = useRef({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null!);
  const itemRef = useItemStore((state) => state.items.find((i) => i.id === id));
  const [axis, setAxis] = useState<"none" | "both" | "x" | "y">("both");
  const move = useItemStore((state) => state.move);

  function handleStart(e: DraggableEvent) {
    const event = e as MouseEvent;
    const rect = nodeRef.current.getBoundingClientRect();
    grabOffset.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function handleDrag(e: DraggableEvent) {
    const event = e as MouseEvent;
    const interactable = findInteractableAt(event.clientX, event.clientY);
    const container = findContainerAt(event.clientX, event.clientY);
    const myHandler = getDragHandler<Handler>(type);
    let interrupt = false;

    if (myHandler && !interrupt) {
      interrupt = !myHandler({ id, mouse: event });
    }

    if (interactable && !interrupt) {
      const handler = getDragHandler<InteractableHandler>(interactable.name);
      if (handler) {
        interrupt = !handler({
          id,
          interactableElement: interactable.element,
        });
      }
    }

    if (container && !interrupt) {
      const handler = getDragHandler<ContainerHandler>(container.name);
      if (handler) {
        interrupt = !handler({
          id,
          containerElement: container.element,
        });
      }
    }

    if (interrupt) {
      setAxis("none");
    } else {
    }
  }

  function handleStop(e: DraggableEvent, data: DraggableData) {
    const event = e as MouseEvent;
    const interactable = findInteractableAt(event.clientX, event.clientY);
    const container = findContainerAt(event.clientX, event.clientY);
    const myHandler = getStopHandler<Handler>(type);
    let interrupt = false;

    const itemClientX = event.clientX - grabOffset.current.x;
    const itemClientY = event.clientY - grabOffset.current.y;

    let targetContainer = itemRef?.container ?? "gameview";
    let targetX = itemClientX;
    let targetY = itemClientY;

    if (myHandler && !interrupt) {
      interrupt = !myHandler({ id, mouse: event });
    }

    if (interactable && !interrupt) {
      const handler = getStopHandler<InteractableHandler>(interactable.name);
      if (handler) {
        interrupt = !handler({
          id,
          interactableElement: interactable.element,
        });
      }
    }

    if (container && !interrupt) {
      const handler = getStopHandler<ContainerStopHandler>(container.name);
      if (handler) {
        interrupt = !handler({
          id,
          clientX: event.clientX,
          clientY: event.clientY,
          itemClientX,
          itemClientY,
          containerElement: container.element,
        });
      }

      targetContainer = container.name;
      const { x: localX, y: localY } = toLocalCoords(
        container.element,
        itemClientX,
        itemClientY,
      );
      targetX = localX;
      targetY = localY;
    }

    if (interrupt) {
      // disrupt default drop behaviour
    } else {
      if (axis == "none") setAxis("both");
      else move(id, targetContainer, targetX, targetY);
    }
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x, y }}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
      disabled={disabled}
      axis={axis}
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
