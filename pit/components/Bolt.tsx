"use client";

import { createRef, useState } from "react";
import { useEffect } from "react";
import { motion } from "motion/react";
import AttachmentPoint, { getAttachID } from "./AttachmentPoint";

export default function Bolt({
  parentTag,
  max_bolt_length = 360,
  index,
  x = 0,
  y = 0,
  setBolt,
  tightened,
}: {
  parentTag: string;
  max_bolt_length?: number;
  index: number;
  x: number;
  y: number;
  setBolt: (setTo: boolean) => void;
  tightened?: boolean;
}) {
  const [rotation, setRotation] = useState<number>(
    tightened ? max_bolt_length : 0,
  );
  const [bolted, setBolted] = useState<boolean>(tightened ? tightened : false);
  const [tag] = useState(`bolt-${index}`);
  const boltref = createRef<HTMLDivElement>();

  useEffect(() => {
    console.log(bolted, tightened, rotation);
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
      style={{
        left: `${x}%`,
        top: `${y}%`,
        height: "5cqw",
        aspectRatio: "1/1",
        position: "absolute",
        translate: `-50% -50%`,
      }}
    >
      <img
        draggable={false}
        alt="bolt"
        src={"/elements/items/bolt.png"}
        style={{ transformOrigin: "50% 50%", rotate: `${rotation}deg` }}
      />
      <AttachmentPoint
        parentTag={parentTag}
        tag={tag}
        style={{ height: "100%", width: "100%", top: "0%", left: "0%" }}
        ref={boltref}
      />
    </div>
  );
}
