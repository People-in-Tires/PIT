import { toLocalCoords } from "../engine/itemHandlerHelpers";
import { useEffect, useRef, useState } from "react";

import styles from "@/css/Game.module.css";
import { findContainersAt } from "../engine/DraggableItem";
import overlap from "@/lib/libft/overlap";
import getAngle from "@/lib/libft/getangle";
import {
  registerStopHandler,
  registerDragHandler,
  Handler,
  unregisterDragHandler,
  unregisterStopHandler,
  action,
} from "../engine/itemHandlerRegistry";
import useItemStore, { Item } from "../engine/itemStore";

export default function Wrench({}: Item) {
  const headref = useRef<HTMLDivElement>(null);
  const boltRef = useRef<Element>(null);
  const [attached, setAttached] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const move = useItemStore().move;

  function setBoltRef({ id }: Handler) {
    if (boltRef.current != null) {
      boltRef.current = null;
      setAttached(false);
      return action.interrupt;
    }
    if (!headref.current) return action.fallback;
    const interactableElement = overlap(
      headref.current,
      styles.bolt,
      "attached",
    );
    if (!interactableElement) return action.fallback;
    boltRef.current = interactableElement;
    const boltReq = interactableElement.getBoundingClientRect();
    const headReq = headref.current.getBoundingClientRect();
    const containers = findContainersAt(boltReq.left, boltReq.top);
    if (containers.length == 0) return action.fallback;
    const { x: localX, y: localY } = toLocalCoords(
      containers[0].element,
      boltReq.left + boltReq.width / 2 - headReq.width / 2,
      boltReq.top + boltReq.height / 2 - headReq.height / 2,
    );
    boltRef.current = interactableElement;
    setAttached(true);
    for (const containerAt of containers) {
      move(id, {
        container: containerAt.name,
        x: boltReq.left + boltReq.width / 2 - headReq.width,
        y: boltReq.top + boltReq.height / 2 - headReq.height,
      });
    }
    return action.interrupt;
  }

  function rotate({ mouse }: Handler) {
    if (boltRef.current == null || mouse == undefined) return action.fallback;
    const parentReq = boltRef.current.getBoundingClientRect();
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
    boltRef.current.dispatchEvent(
      new CustomEvent("rotate", {
        detail: { rotation: rotation, delta_rotation: delta_rotation },
      }),
    );
    return action.interrupt;
  }

  useEffect(() => {
    registerStopHandler("wrench", setBoltRef);
    registerDragHandler("wrench", rotate);
    return () => {
      unregisterStopHandler("wrench");
      unregisterDragHandler("wrench");
    };
  }, [setBoltRef, rotate]);

  return (
    <div
      className={`${styles.wrench} ${styles.tool} ${attached ? "attached" : undefined}`}
    >
      <div
        style={{
          backgroundImage: `url("/wrench.svg")`,
          backgroundSize: `contain`,
          backgroundRepeat: `no-repeat`,
          height: "100%",
          transformOrigin: `50% 10%`,
          rotate: `${rotation}deg`,
        }}
      >
        <div
          ref={headref}
          style={{ height: "10%", width: "50%", left: "25%", top: "5%" }}
          className={`${styles.hitbox}`}
        ></div>
        <div
          id={"handle"}
          style={{
            position: "absolute",
            height: "40%",
            width: "100%",
            top: "55%",
          }}
        ></div>
      </div>
    </div>
  );
}
