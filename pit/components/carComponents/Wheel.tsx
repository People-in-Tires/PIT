import { createRef, useState } from "react";
import DraggableItem from "../DraggableItem";
import { ItemProps } from "../item";
import styles from "@/css/Game.module.css";
import { useEffect } from "react";
import { Ref } from "react";
export default function Wheel({
  wheeltype,
}: { wheeltype: "normal" | "hard" | "soft" | "wets" } & ItemProps) {
  const nodeRef = createRef<HTMLDivElement>();
  const [bolted, setBolted] = useState<boolean[]>([true, true, true, true]);

  function setBolt(index: number, setTo: boolean) {
    const newTodos = [...bolted];
    newTodos[index] = setTo;
    setBolted(newTodos);
  }
  return (
    <DraggableItem
      nodeRef={nodeRef}
      disabled={!bolted.every((v) => v === false)}
    >
      <div ref={nodeRef}>
        <NormalWheel setBolt={setBolt} />
      </div>
    </DraggableItem>
  );
}

function Bolt({
  bolt_length = 360,
  x = 0,
  y = 0,
  index,
  setBolt,
}: {
  bolt_length?: number;
  index: number;
  setBolt: (index: number, setTo: boolean) => void;
} & ItemProps) {
  const [rotation, setRotation] = useState<number>(bolt_length);
  const ref = createRef<HTMLDivElement>();
  const [bolted, setBolted] = useState<boolean>(true);

  useEffect(() => {
    setBolt(index, bolted);
  }, [bolted]);

  function Rotate(e: Event) {
    const customE = e as CustomEvent;
    console.log(rotation);
    setRotation((prevRotation): number => {
      let newRot = prevRotation + customE.detail.delta_rotation;
      if (newRot > bolt_length) {
        setBolted(true);
        newRot = bolt_length;
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
}: {
  setBolt: (index: number, setTo: boolean) => void;
}) {
  return (
    <div className={`${styles.wheel}`}>
      <Bolt x={50} y={25} index={0} setBolt={setBolt} />
      <Bolt x={50} y={75} index={1} setBolt={setBolt} />
      <Bolt x={25} y={50} index={2} setBolt={setBolt} />
      <Bolt x={75} y={50} index={3} setBolt={setBolt} />

      <img draggable={false} src={"/wheelnormal.svg"}></img>
    </div>
  );
}
