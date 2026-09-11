import { createRef, useState } from "react";
import { ItemProps } from "../engine/item";
import styles from "@/css/Game.module.css";
import { useEffect } from "react";

export default function Bolt({
  max_bolt_length = 360,
  x = 0,
  y = 0,
  index,
  setBolt,
  tightened,
}: {
  max_bolt_length?: number;
  index?: number;
  setBolt?: (setTo: boolean, index?: number) => void;
  tightened?: boolean;
} & ItemProps) {
  const [rotation, setRotation] = useState<number>(
    tightened ? max_bolt_length : 0,
  );
  const [bolted, setBolted] = useState<boolean>(tightened ? tightened : false);
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!setBolt) return;
    setBolt(bolted, index);
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
      data-interactable={"bolt"}
      ref={ref}
      className={`${styles.item} ${styles.bolt} ${bolted ? "bolted" : "unbolted"}`}
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
