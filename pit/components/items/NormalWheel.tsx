"use client";

import styles from "@/css/Game.module.css";
import { Item } from "../engine/itemStore";
import React from "react";
import AttachPoint from "../AttachPoint";
import BoltGroup from "../BoltGroup";

export default function NormalWheel({
  tightenedPer = 0,
  id,
  attachedTo,
  container,
  invSlot,
}: {} & Item) {
  const tag = `normalwheel${id}`;

  return (
    <div className={`${attachedTo ? "attached" : undefined} ${styles.wheel}`}>
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
      <div id={"wheelhandle"}>
        <img
          draggable={false}
          src={"/elements/wheels/NormalWheel.png"}
          alt="normalwheel"
        />
        <AttachPoint
          attachedTo={attachedTo}
          parentContainer={container}
          invslot={invSlot}
          tag={tag}
          style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
          target={["spoke"]}
        />
      </div>
    </div>
  );
}
