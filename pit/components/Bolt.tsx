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
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    setBolt(bolted);
  }, [bolted]);

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
    ref.current?.addEventListener("rotate", Rotate);
    return () => {
      ref.current?.removeEventListener("rotate", Rotate);
    };
  }, []);

  return (
    <div
      data-interactable={"bolt"}
      ref={ref}
      className={`${styles.bolt} ${styles.interactable}`}
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
