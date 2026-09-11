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
  action,
} from "./itemHandlerRegistry";
import { toLocalCoords } from "./itemHandlerHelpers";
import styles from "@/css/Game.module.css";

interface DraggableItemProps extends Item {
  children: React.ReactNode;
  disabled?: boolean;
}

export function findInteractablesWithin(
  rect: DOMRect | undefined,
): { name: string; element: HTMLElement }[] | null {
  let interactable: { name: string; element: HTMLElement }[] | null;
  if (rect == undefined) return null;
  interactable = findInteractablesAt(rect.left, rect.top);
  if (interactable != null) return interactable;
  interactable = findInteractablesAt(rect.left, rect.bottom);
  if (interactable != null) return interactable;
  interactable = findInteractablesAt(rect.right, rect.top);
  if (interactable != null) return interactable;
  interactable = findInteractablesAt(rect.right, rect.bottom);
  if (interactable != null) return interactable;
  return null;
}

export function findInteractablesAt(
  clientX: number,
  clientY: number,
): { name: string; element: HTMLElement }[] {
  const stack = document.elementsFromPoint(clientX, clientY);
  const results: { name: string; element: HTMLElement }[] = [];
  for (const element of stack) {
    const interactable = (element as HTMLElement).dataset?.interactable;
    if (interactable)
      results.push({ name: interactable, element: element as HTMLElement });
  }
  return results;
}

export function findContainersAt(
  clientX: number,
  clientY: number,
): { name: string; element: HTMLElement }[] {
  const stack = document.elementsFromPoint(clientX, clientY);
  const results: { name: string; element: HTMLElement }[] = [];
  for (const element of stack) {
    const container = (element as HTMLElement).dataset?.container;
    if (container)
      results.push({ name: container, element: element as HTMLElement });
  }
  return results;
}

export default function DraggableItem({
  id,
  type,
  container,
  x,
  y,
  children,
  disabled,
  handle,
}: DraggableItemProps) {
  const grabOffset = useRef({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null!);
  const itemRef = useItemStore((state) => state.items.find((i) => i.id === id));
  const [axis, setAxis] = useState<"none" | "both" | "x" | "y">("both");
  const move = useItemStore((state) => state.move);

  function handleStart(e: DraggableEvent) {
    const event = e as MouseEvent;
    const interactables = findInteractablesAt(event.clientX, event.clientY);
    const containers = findContainersAt(event.clientX, event.clientY);
    const myHandler = getStartHandler<Handler>(type);
    let act = action.done;

    const rect = nodeRef.current.getBoundingClientRect();
    grabOffset.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    if (myHandler) {
      act = myHandler({ id });
    }

    for (const interactableAt of interactables) {
      if (interactableAt && act !== action.interrupt) {
        const handler = getStartHandler<InteractableHandler>(
          interactableAt.name,
        );
        if (handler) {
          act = handler({
            id,
            interactableElement: interactableAt.element,
          });
        }
      }
      if (act !== action.fallback) break;
    }

    for (const containerAt of containers) {
      if (containerAt && act !== action.interrupt) {
        const handler = getStartHandler<ContainerHandler>(containerAt.name);
        if (handler) {
          act = handler({
            id,
            containerElement: containerAt.element,
          });
        }
      }
      if (act !== action.fallback) break;
    }

    switch (act) {
      case action.fallback:
        // default behaviour
        break;
      case action.interrupt:
        // kill the vibe
        break;
      default:
    }
  }

  function handleDrag(e: DraggableEvent) {
    const event = e as MouseEvent;
    const interactables = findInteractablesAt(event.clientX, event.clientY);
    const containers = findContainersAt(event.clientX, event.clientY);
    const myHandler = getDragHandler<Handler>(type);
    let act = action.done;

    if (myHandler) {
      act = myHandler({ id, mouse: event });
    }

    for (const interactableAt of interactables) {
      if (interactableAt && act !== action.interrupt) {
        const handler = getDragHandler<InteractableHandler>(
          interactableAt.name,
        );
        if (handler) {
          act = handler({
            id,
            interactableElement: interactableAt.element,
          });
        }
      }
      if (act !== action.fallback) break;
    }

    for (const containerAt of containers) {
      if (containerAt && act !== action.interrupt) {
        const handler = getDragHandler<ContainerHandler>(containerAt.name);
        if (handler) {
          act = handler({
            id,
            containerElement: containerAt.element,
          });
        }
      }
      if (act !== action.fallback) break;
    }

    switch (act) {
      case action.fallback:
        // default behaviour
        break;
      case action.interrupt:
        setAxis("none");
        break;
      default:
    }
  }

  function handleStop(e: DraggableEvent, data: DraggableData) {
    const event = e as MouseEvent;
    const interactables = findInteractablesAt(event.clientX, event.clientY);
    const containers = findContainersAt(event.clientX, event.clientY);
    const myHandler = getStopHandler<Handler>(type);
    let act = action.fallback;

    const itemClientX = event.clientX - grabOffset.current.x;
    const itemClientY = event.clientY - grabOffset.current.y;

    let targetContainer =
      containers.length > 0 ? containers[0].name : container;
    let targetX = itemClientX;
    let targetY = itemClientY;

    if (myHandler) {
      act = myHandler({ id, mouse: event });
    }

    for (const interactableAt of interactables) {
      if (interactableAt && act !== action.interrupt) {
        const handler = getStopHandler<InteractableHandler>(
          interactableAt.name,
        );
        if (handler) {
          act = handler({
            id,
            interactableElement: interactableAt.element,
          });
        }
      }
      if (act !== action.fallback) break;
    }

    for (const containerAt of containers) {
      if (containerAt && act !== action.interrupt) {
        const handler = getStopHandler<ContainerStopHandler>(containerAt.name);
        if (handler) {
          act = handler({
            id,
            clientX: event.clientX,
            clientY: event.clientY,
            itemClientX,
            itemClientY,
            containerElement: containerAt.element,
          });
        }

        if (act === action.done) {
          targetContainer = containerAt.name;
          const { x: localX, y: localY } = toLocalCoords(
            containerAt.element,
            itemClientX,
            itemClientY,
          );
          targetX = localX;
          targetY = localY;
        }
      }
      console.log(containerAt.name, "attempted");
      if (act !== action.fallback) break;
    }

    switch (act) {
      case action.interrupt:
        // kill the vibe
        break;
      default:
        move(id, targetContainer, targetX, targetY);
    }
    if (axis == "none") setAxis("both");
    const allItems = useItemStore.getState().items;
    allItems.forEach((value) => console.log(value));
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
      handle={handle}
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
