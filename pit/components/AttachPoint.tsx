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
  setAttached,
  style,
  target,
  targetParent,
  offsetParent,
  detachondrop = false,
}: {
  attachedTo?: Element;
  tag: string;
  setAttached: (input: boolean) => void;
  style: CSSProperties;
  target: string;
  targetParent?: string;
  offsetParent: { x: number; y: number };
  detachondrop?: boolean;
}) {
  const noderef = useRef<HTMLDivElement>(null);
  const attachRef = useRef<Element | undefined>(attachedTo);
  const move = useItemStore().move;
  const update = useItemStore().update;

  useEffect(() => {
    registerStopHandler(tag, ({ id }: Handler) => {
      if (attachRef.current != undefined) {
        attachRef.current = undefined;
        setAttached(false);
        update(id, { attachedTo: attachRef.current });
        if (detachondrop) return action.interrupt;
      }
      if (!noderef.current || !noderef.current.parentElement)
        return action.fallback;
      const interactableElement = overlap(
        noderef.current,
        target,
        targetParent,
      );
      if (!interactableElement) return action.fallback;
      const spokeReq = interactableElement.getBoundingClientRect();
      const parentReq = noderef.current.parentElement.getBoundingClientRect();
      const container = findContainerAt(spokeReq.left, spokeReq.top);
      if (container == null) return action.fallback;
      const { x: localX, y: localY } = toLocalCoords(
        container.element,
        spokeReq.left + spokeReq.width / 2 - parentReq.width * offsetParent.x,
        spokeReq.top + spokeReq.height / 2 - parentReq.height * offsetParent.y,
      );
      attachRef.current = interactableElement;
      setAttached(true);
      update(id, { attachedTo: attachRef.current });
      move(id, { container: container.name, x: localX, y: localY });
      return action.interrupt;
    });
    return () => {
      unregisterStopHandler(tag);
    };
  }, []);

  return <div ref={noderef} className={styles.hitbox} style={style} />;
}
