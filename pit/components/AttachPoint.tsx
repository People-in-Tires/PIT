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
import { findAttach } from "./AttachmentPoint";
import { findContainerAt } from "@/components/engine/DraggableItem";

export default function AttachPoint({
  attachedTo,
  tag,
  style,
  target,
  targetParent,
  disabled,
}: {
  attachedTo?: string;
  tag: string;
  style: CSSProperties;
  target: string[];
  targetParent?: string;
  parentContainer: string;
  invslot?: number;
  disabled?: boolean;
}) {
  const attachref = useRef<HTMLDivElement>(null);
  const move = useItemStore().move;
  const update = useItemStore().update;

  useEffect(() => {
    if (disabled == true) return;
    registerStopHandler(tag, ({ id, mouse }: Handler) => {
      const item = useItemStore.getState().items[id];
      if (
        !attachref.current ||
        !attachref.current.parentElement ||
        !item ||
        !mouse
      )
        return action.fallback;

      let interactableElement: Element | undefined = undefined;
      for (const elem of target) {
        interactableElement = findAttach(attachref.current, elem, targetParent);
        if (interactableElement) break;
      }
      if (!interactableElement) return action.fallback;
      const container = findContainerAt(mouse.screenX, mouse.screenY);
      if (!container) return action.fallback;
      const slotIndex = Number(
        container.element.getAttribute("data-container"),
      );
      const attachID = interactableElement.getAttribute("data-attach")!;
      move(id, {
        attachedTo: attachID,
        container: container.name,
        x: 0,
        y: 0,
        invSlot: slotIndex,
      });
      return action.interrupt;
    });
    return () => unregisterStopHandler(tag);
  }, [move, update, disabled, tag, target, targetParent, attachedTo]);

  return <div ref={attachref} style={{ ...style, position: "absolute" }} />;
}
