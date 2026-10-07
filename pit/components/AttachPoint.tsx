"use client";

import { CSSProperties, useEffect } from "react";
import styles from "@/css/Game.module.css";
import {
  Handler,
  registerStopHandler,
  unregisterStopHandler,
  action,
} from "@/components/engine/itemHandlerRegistry";
import { useRef } from "react";
import useItemStore from "@/components/engine/itemStore";
import overlap from "@/lib/libft/overlap";
import { findContainerAt } from "@/components/engine/DraggableItem";
import { toLocalCoords } from "@/components/engine/itemHandlerHelpers";

export default function AttachPoint({
  attachedTo,
  tag,
  style,
  target,
  targetParent,
  offsetParent = { x: 50, y: 50 },
  detachondrop = false,
  disabled,
}: {
  attachedTo?: Element | boolean;
  tag: string;
  style: CSSProperties;
  target: string[];
  targetParent?: string;
  offsetParent?: { x: number; y: number };
  detachondrop?: boolean;
  disabled?: boolean;
}) {
  const attachref = useRef<HTMLDivElement>(null);
  const move = useItemStore().move;
  const update = useItemStore().update;

  useEffect(() => {
    if (disabled == true) return;
    registerStopHandler(tag, ({ id }: Handler) => {
      if (!attachref.current || !attachref.current.parentElement || !useItemStore.getState().items[id])
        return action.fallback;
      if (attachedTo instanceof Element) {
        attachedTo.dispatchEvent(
          new CustomEvent("attach", {
            detail: { attachedID: -1 },
          }),
        );
        update(id, { attachedTo: undefined });
      }

      let interactableElement: Element | undefined = undefined;
      let overlap_with: HTMLElement | undefined = attachref.current;
      if (attachedTo == true)
        overlap_with = findContainerAt(
          useItemStore.getState().items[id].x,
          useItemStore.getState().items[id].y,
        )?.element;
      for (const elem of target) {
        interactableElement = overlap(overlap_with!, elem, targetParent);
        if (interactableElement) break;
      }
      if (!interactableElement) return action.fallback;

      const spokeReq = interactableElement.getBoundingClientRect();
      const parentReq = attachref.current.parentElement.getBoundingClientRect();
      const container = findContainerAt(spokeReq.left, spokeReq.top);
      if (container == null) return action.fallback;
      const slotIndex = Number(container.element.dataset.slot);
      const { x: localX, y: localY } = toLocalCoords(
        container.element,
        spokeReq.left + spokeReq.width / 2 - parentReq.width * offsetParent.x, //doesnt play nice with rotate
        spokeReq.top + spokeReq.height / 2 - parentReq.height * offsetParent.y,
      );
      update(id, { attachedTo: interactableElement });
      move(id, {
        container: container.name,
        x: localX,
        y: localY,
        invSlot: slotIndex,
      });
      interactableElement.dispatchEvent(
        new CustomEvent("attach", {
          detail: { attachedID: id },
        }),
      );
      return action.interrupt;
    });
    return () => unregisterStopHandler(tag);
    ;
  }, [
    disabled,
    tag,
    target,
    targetParent,
    attachedTo,
    detachondrop,
    offsetParent,
  ]);

  return <div ref={attachref} className={styles.hitbox} style={style} />;
}
