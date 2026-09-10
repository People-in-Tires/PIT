import React, { createRef, useCallback, useEffect, useState } from "react";
import Bolt from "../carComponents/Bolt";
import { ItemProps } from "../engine/item";
import styles from "@/css/Game.module.css";
import {
  Handler,
  registerStopHandler,
  unregisterStopHandler,
} from "../engine/itemHandlerRegistry";
import { useRef } from "react";
import useItemStore from "../engine/itemStore";
import overlap from "@/lib/libft/overlap";
import { findContainersAt } from "../engine/DraggableItem";

export default function NormalWheel({
  tightenedPer,
}: {
  tightenedPer?: number;
}) {
  const hitboxRef = createRef<HTMLDivElement>();
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

  function setSpokeRef({ id }: Handler) {
    if (spokeRef.current != null) {
      spokeRef.current = null;
      setAttached(false);
      return true;
    }
    if (!hitboxRef.current) return true;
    const interactableElement = overlap(hitboxRef.current, "spoke");
    if (!interactableElement) return true;
    spokeRef.current = interactableElement;
    const spokeReq = interactableElement.getBoundingClientRect();
    const hitboxReq = hitboxRef.current.getBoundingClientRect();
    const containers = findContainersAt(spokeReq.left, spokeReq.top);
    if (containers.length === 0) return true;
    setAttached(true);
    for (const container of containers) {
      move(id, {
        container: container.name,
        x: spokeReq.left + spokeReq.width / 2 - hitboxReq.width,
        y: spokeReq.top + spokeReq.height / 2 - hitboxReq.height,
      });
    }
    return false;
  }

  useEffect(() => {
    registerStopHandler("normalwheel", setSpokeRef);
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
    <div className={`${styles.wheel} ${attached ? "attached" : undefined}`}>
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
