import { createRef, useState } from "react";
import DraggableItem from "../engine/DraggableItem";
import { ItemProps } from "../engine/item";
import styles from "@/css/Game.module.css";
import { useEffect } from "react";

export default function Wheel({
  wheeltype,
  tightenedPer,
  spokeRef,
}: {
  wheeltype: "normal" | "hard" | "soft" | "wets";
  tightenedPer?: number;
  spokeRef?: React.RefObject<HTMLDivElement | null>;
} & ItemProps) {
  const nodeRef = createRef<HTMLDivElement>();
  const hitboxRef = createRef<HTMLDivElement>();
  const [bolted, setBolted] = useState<boolean[]>([
    tightenedPer ? tightenedPer <= 0.25 : false,
    tightenedPer ? tightenedPer <= 0.5 : false,
    tightenedPer ? tightenedPer <= 0.75 : false,
    tightenedPer ? tightenedPer <= 1.0 : false,
  ]);

  function setBolt(index: number, setTo: boolean) {
    const newTodos = [...bolted];
    newTodos[index] = setTo;
    setBolted(newTodos);
  }
  return (
    <DraggableItem
      nodeRef={nodeRef}
      disabled={!bolted.every((v) => v === false)}
      attachTarget={"spoke"}
      attachHitbox={hitboxRef}
      attachStart={spokeRef}
    >
      <div ref={nodeRef} className={`${styles.item} ${styles.wheel}`}>
        <NormalWheel setBolt={setBolt} tightenedPer={tightenedPer} />
        <div
          ref={hitboxRef}
          className={`${styles.hitbox}`}
          style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
        ></div>
      </div>
    </DraggableItem>
  );
}

export function Bolt({
  max_bolt_length = 360,
  x = 0,
  y = 0,
  index,
  setBolt,
  tightened,
}: {
  max_bolt_length?: number;
  index?: number;
  setBolt: (index: number, setTo: boolean) => void;
  tightened: boolean;
} & ItemProps) {
  const [rotation, setRotation] = useState<number>(
    tightened ? max_bolt_length : 0,
  );
  const [bolted, setBolted] = useState<boolean>(tightened);
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    console.log(bolted);
    if (index) setBolt(index, bolted);
    else setBolt(0, bolted);
  }, [bolted]);

  function Rotate(e: Event) {
    const customE = e as CustomEvent;
    setRotation((prevRotation): number => {
      let newRot = prevRotation + customE.detail.delta_rotation;
      if (newRot > max_bolt_length) {
        setBolted(true);
        newRot = max_bolt_length;
      } else setBolted(false);

      if (newRot < 0) {
        newRot %= 360;
      }
      return newRot;
    });
  }

  useEffect(() => {
    ref.current?.addEventListener("rotate", Rotate);
    return () => {
      ref.current?.removeEventListener("rotate", Rotate);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.item} ${styles.bolt}`}
      style={{ left: `${x - 10}%`, top: `${y - 10}%` }}
    >
      <img
        style={{ rotate: `${rotation}deg`, transformOrigin: "50% 50%" }}
        draggable={false}
        src={"/bolt.svg"}
      ></img>
    </div>
  );
}

function NormalWheel({
  setBolt,
  tightenedPer,
}: {
  setBolt: (index: number, setTo: boolean) => void;
  tightenedPer?: number;
}) {
  return (
    <div>
      <Bolt
        x={50}
        y={25}
        index={0}
        setBolt={setBolt}
        tightened={tightenedPer != undefined ? tightenedPer <= 0.25 : false}
      />
      <Bolt
        x={50}
        y={75}
        index={1}
        setBolt={setBolt}
        tightened={tightenedPer != undefined ? tightenedPer <= 0.5 : false}
      />
      <Bolt
        x={25}
        y={50}
        index={2}
        setBolt={setBolt}
        tightened={tightenedPer != undefined ? tightenedPer <= 0.75 : false}
      />
      <Bolt
        x={75}
        y={50}
        index={3}
        setBolt={setBolt}
        tightened={tightenedPer != undefined ? tightenedPer <= 1.0 : false}
      />

      <img draggable={false} src={"/wheelnormal.svg"}></img>
    </div>
  );
}
