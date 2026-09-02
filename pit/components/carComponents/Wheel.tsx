import { createRef, useRef, useState } from "react";
import DraggableItem from "../DraggableItem";
import { ItemProps } from "../item";
import styles from "@/css/Game.module.css";
import { useEffect } from "react";
import { ControlPosition, DraggableData } from "react-draggable";
import overlap from "@/lib/libft/overlap";
import { Ref } from "react";
export default function Wheel({
  wheeltype,
  fresh = false,
}: {
  wheeltype: "normal" | "hard" | "soft" | "wets";
  fresh?: boolean;
} & ItemProps) {
  const nodeRef = createRef<HTMLDivElement>();
  const hitboxRef = createRef<HTMLDivElement>();
  const [bolted, setBolted] = useState<boolean[]>([
    !fresh,
    !fresh,
    !fresh,
    !fresh,
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
    >
      <div ref={nodeRef} className={`${styles.item} ${styles.wheel}`}>
        <NormalWheel setBolt={setBolt} fresh={fresh} />
        <div
          ref={hitboxRef}
          className={`${styles.hitbox}`}
          style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
        ></div>
      </div>
    </DraggableItem>
  );
}

function Bolt({
  max_bolt_length = 360,
  x = 0,
  y = 0,
  index,
  setBolt,
  fresh,
}: {
  max_bolt_length?: number;
  index: number;
  setBolt: (index: number, setTo: boolean) => void;
  fresh: boolean;
} & ItemProps) {
  const [rotation, setRotation] = useState<number>(fresh ? 0 : max_bolt_length);
  const [bolted, setBolted] = useState<boolean>(!fresh);
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    setBolt(index, bolted);
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
  fresh,
}: {
  setBolt: (index: number, setTo: boolean) => void;
  fresh: boolean;
}) {
  return (
    <div>
      <Bolt x={50} y={25} index={0} setBolt={setBolt} fresh={fresh} />
      <Bolt x={50} y={75} index={1} setBolt={setBolt} fresh={fresh} />
      <Bolt x={25} y={50} index={2} setBolt={setBolt} fresh={fresh} />
      <Bolt x={75} y={50} index={3} setBolt={setBolt} fresh={fresh} />

      <img draggable={false} src={"/wheelnormal.svg"}></img>
    </div>
  );
}
