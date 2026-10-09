"use client";

import { createRef, useState } from "react";
import { ItemProps } from "./engine/item";
import styles from "@/css/Game.module.css";
import { useEffect } from "react";

export default function Bolt({
  max_bolt_length = 360,
  x = 0,
  y = 0,
  setBolt,
  tightened,
}: {
  max_bolt_length?: number;
  setBolt: (setTo: boolean) => void;
  tightened?: boolean;
} & ItemProps) {
  const [rotation, setRotation] = useState<number>(
    tightened ? max_bolt_length : 0,
  );
  const [bolted, setBolted] = useState<boolean>(tightened ? tightened : false);
  const boltref = createRef<HTMLDivElement>();

  useEffect(() => {
    setBolt(bolted);
  }, [setBolt, bolted]);

  function Rotate(e: Event) {
    const customE = e as CustomEvent;
    setRotation((prevRotation): number => {
      let newRot = prevRotation + customE.detail.delta_rotation;
      setBolted(newRot > max_bolt_length * 0.9);
      if (newRot > max_bolt_length) newRot = max_bolt_length;
      else if (newRot < 0) {
        newRot %= 360;
      }
      return newRot;
    });
  }

  useEffect(() => {
    const ref = boltref.current;
    if (!ref) return;
    ref.addEventListener("rotate", Rotate);
    return () => {
      ref.removeEventListener("rotate", Rotate);
    };
  }, [Rotate]);

  return (
    <div
      data-interactable={"bolt"}
      ref={boltref}
      className={`${styles.bolt} ${styles.interactable}`}
      style={{ left: `${x - 10}%`, top: `${y - 10}%` }}
    >
      <img
        style={{ rotate: `${rotation}deg`, transformOrigin: "50% 50%" }}
        draggable={false}
        alt="bolt"
        src={"/elements/items/bolt.png"}
      ></img>
    </div>
  );
}
