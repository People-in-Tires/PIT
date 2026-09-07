"use client";

import { useRef, useEffect } from "react";
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
function findInteractableAt(
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

function findContainerAt(
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
      interrupt = !myHandler({ id });
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
      // disrupt default drag behaviour (like disabling axis)
    } else {
      // default drag handler
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
      interrupt = !myHandler({ id });
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
      move(id, targetContainer, targetX, targetY);
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
