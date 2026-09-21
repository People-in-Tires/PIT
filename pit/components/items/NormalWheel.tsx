"use client";

import { useState } from "react";
import styles from "@/css/Game.module.css";
import { Item } from "../engine/itemStore";
import AttachPoint from "../AttachPoint";
import BoltGroup from "../BoltGroup";

export default function NormalWheel({
  tightenedPer = 0,
  id,
  attachedTo,
}: {} & Item) {
  const tag = `normalwheel${id}`;

  return (
    <div className={`${styles.wheel} ${attachedTo ? "attached" : undefined}`}>
      <BoltGroup
        id={id}
        locations={[
          { x: 35, y: 50 },
          { x: 50, y: 35 },
          { x: 65, y: 50 },
          { x: 50, y: 65 },
        ]}
        tightenedPer={tightenedPer}
      />
      <img draggable={false} src={"/wheelnormal.svg"}></img>
      <AttachPoint
        attachedTo={attachedTo}
        tag={tag}
        style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
        target={["spoke"]}
        offsetParent={{ x: 0.5, y: 0.5 }}
      />
    </div>
  );
}
