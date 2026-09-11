import React, { createRef, useCallback, useEffect, useState } from "react";
import Bolt from "../carComponents/Bolt";
import { ItemProps } from "../engine/item";
import styles from "@/css/Game.module.css";
import {
  Handler,
  registerStopHandler,
  unregisterStopHandler,
  action,
} from "../engine/itemHandlerRegistry";
import { useRef } from "react";
import useItemStore, { Item, useItemsState } from "../engine/itemStore";
import overlap from "@/lib/libft/overlap";
import { findContainersAt } from "../engine/DraggableItem";
import { toLocalCoords } from "../engine/itemHandlerHelpers";

export default function NormalWheel({
  tightenedPer,
  id,
}: {
  tightenedPer?: number;
} & Item) {
  const hitboxRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const spokeRef = useRef<Element>(null);
  const [bolted, setBolted] = useState<boolean[]>(
    tightenedPer
      ? [
          tightenedPer <= 0.25,
          tightenedPer <= 0.5,
          tightenedPer <= 0.75,
          tightenedPer <= 1.0,
        ]
      : [false, false, false, false],
  );
  const [attached, setAttached] = useState<boolean>(false);
  const move = useItemStore().move;

  useEffect(() => {
    registerStopHandler("normalwheel", ({ id }: Handler) => {
      if (!hitboxRef.current || !wheelRef.current) return action.fallback;
      if (spokeRef.current != null) {
        spokeRef.current = null;
        setAttached(false);
      }
      const interactableElement = overlap(hitboxRef.current, "spoke");
      if (!interactableElement) return action.fallback;

      const spokeReq = interactableElement.getBoundingClientRect();
      const wheelReq = wheelRef.current.getBoundingClientRect();
      const container = findContainersAt(spokeReq.left, spokeReq.top);
      if (container.length == 0) return action.fallback;
      const { x: localX, y: localY } = toLocalCoords(
        container[0].element,
        spokeReq.left + spokeReq.width / 2 - wheelReq.width / 2,
        spokeReq.top + spokeReq.height / 2 - wheelReq.height / 2,
      );
      spokeRef.current = interactableElement;
      setAttached(true);
      move(id, container[0].name, localX, localY);

      return action.interrupt;
    });
    console.log("mounting wheel");
    return () => {
      unregisterStopHandler("normalwheel");
      console.log("unmounting wheel");
    };
  }, []);

  function setBolt(setTo: boolean, index?: number) {
    const newTodos = [...bolted];
    newTodos[index ? index : 0] = setTo;
    setBolted(newTodos);
  }

  return (
    <div
      ref={wheelRef}
      className={`${styles.wheel} ${attached ? "attached" : undefined}`}
    >
      <Bolt
        x={50}
        y={25}
        setBolt={setBolt}
        index={0}
        tightened={tightenedPer ? tightenedPer <= 0.25 : false}
      />
      <Bolt
        x={50}
        y={75}
        setBolt={setBolt}
        index={1}
        tightened={tightenedPer ? tightenedPer <= 0.5 : false}
      />
      <Bolt
        x={25}
        y={50}
        setBolt={setBolt}
        index={2}
        tightened={tightenedPer ? tightenedPer <= 0.75 : false}
      />
      <Bolt
        x={75}
        y={50}
        setBolt={setBolt}
        index={3}
        tightened={tightenedPer ? tightenedPer <= 1.0 : false}
      />
      <img draggable={false} src={"/wheelnormal.svg"}></img>
      <div
        ref={hitboxRef}
        className={`${styles.hitbox}`}
        style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
      ></div>
    </div>
  );
}
