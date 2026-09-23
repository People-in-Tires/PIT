"use client";

import { useRef, useState } from "react";
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
import ItemInfo from "../UI/ItemInfo";

interface DraggableItemProps extends Item {
  children: React.ReactNode;
  setMouse: (input: boolean) => void;
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

// if possible only use this singular one
export function findContainerAt(
  clientX: number,
  clientY: number,
): { name: string; element: HTMLElement } | null {
  const stack = document.elementsFromPoint(clientX, clientY);
  const results: { name: string; element: HTMLElement }[] = [];
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
  handle,
  tightenedPer,
  setMouse,
  className,
}: DraggableItemProps) {
  const grabOffset = useRef({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null!);
  const [axis, setAxis] = useState<"none" | "both" | "x" | "y">("both");
  const move = useItemStore().move;

  function handleStart(e: DraggableEvent) {
    const event = e as MouseEvent;
    const interactables = findInteractablesAt(event.clientX, event.clientY);
    const containerAt = findContainerAt(event.clientX, event.clientY);
    const myHandler = getStartHandler<Handler>(type + id);
    let act = action.fallback;

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

    if (containerAt && act !== action.interrupt) {
      const handler = getStartHandler<ContainerHandler>(containerAt.name);
      if (handler) {
        act = handler({
          id,
          containerElement: containerAt.element,
        });
      }
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
    // const interactables = findInteractablesAt(event.clientX, event.clientY);
    // const container = findContainerAt(event.clientX, event.clientY);
    const myHandler = getDragHandler<Handler>(type + id);
    let act = action.fallback;

    if (myHandler) {
      act = myHandler({ id, mouse: event });
    }

    /*     for (const interactableAt of interactables) {
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

    if (containerAt && act !== action.interrupt) {
      const handler = getDragHandler<ContainerHandler>(containerAt.name);
      if (handler) {
        act = handler({
          id,
          containerElement: containerAt.element,
        });
      }
    }
 */
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
    const containerAt = findContainerAt(event.clientX, event.clientY);
    const myHandler = getStopHandler<Handler>(type + id);
    let act = action.fallback;

    const itemClientX = event.clientX - grabOffset.current.x;
    const itemClientY = event.clientY - grabOffset.current.y;

    let targetContainer = containerAt ? containerAt.name : container;
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

      if (act === action.fallback) {
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
    switch (act) {
      case action.fallback:
        if (axis == "none") setAxis("both");
        else move(id, { container: targetContainer, x: targetX, y: targetY });
        break;
      case action.interrupt:
        // kill the vibe
        break;
      default:
    }
    if (axis == "none") setAxis("both");
    // const allItems = useItemStore.getState().items;
    // allItems.forEach((value) => console.log(value));
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x, y }}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
      disabled={tightenedPer ? tightenedPer != 0 : false}
      axis={axis}
      handle={handle}
    >
      <div
        onMouseEnter={() => setMouse(true)}
        onMouseLeave={() => setMouse(false)}
        ref={nodeRef}
        className={`${className} ${styles.item}`}
        style={{ position: "absolute" }}
      >
        {children}
      </div>
    </Draggable>
  );
}
