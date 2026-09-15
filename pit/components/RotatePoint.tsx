"use client";

import { useState } from "react";
import { useEffect } from "react";
import {
  Handler,
  action,
  registerDragHandler,
  unregisterDragHandler,
} from "@/components/engine/itemHandlerRegistry";
import getAngle from "@/lib/libft/getangle";
import useItemStore from "./engine/itemStore";
import styles from "@/css/Game.module.css";

export default function RotatePoint({
  angle,
  attachedTo,
  tag,
  children,
  transformOrigin,
}: {
  angle: number;
  attachedTo?: Element;
  tag: string;
  transformOrigin: string;
} & React.PropsWithChildren) {
  const [rotation, setRotation] = useState<number>(angle ? angle : 0);
  const update = useItemStore().update;

  function rotate({ id, mouse }: Handler) {
    if (mouse == undefined || attachedTo == undefined) return action.fallback;
    const parentReq = attachedTo.getBoundingClientRect();
    const tmp_rotate = getAngle(
      mouse.x,
      mouse.y,
      parentReq.x + parentReq.width / 2,
      parentReq.y + parentReq.height / 2,
    );
    const delta_rotation = ((tmp_rotate - rotation - 270) % 360) + 180;
    setRotation(
      (prevRotation) =>
        (prevRotation + ((tmp_rotate - prevRotation - 270) % 360) + 180) % 360,
    );
    update(id, { angle: rotation });
    attachedTo.dispatchEvent(
      new CustomEvent("rotate", {
        detail: { rotation: rotation, delta_rotation: delta_rotation },
      }),
    );
    return action.interrupt;
  }

  useEffect(() => {
    registerDragHandler(tag, rotate);
    return () => {
      unregisterDragHandler(tag);
    };
  }, [rotate, tag]);

  return (
    <div
      className={styles.rotatable}
      style={{ rotate: `${rotation}deg`, transformOrigin: transformOrigin }}
    >
      {children}
    </div>
  );
}
