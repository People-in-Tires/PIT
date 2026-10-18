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
        locations={[{ x: 50, y: 50 }]}
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
          style={{ width: "20%", aspectRatio: "1/1", left: "40%", top: "40%" }}
          target={["spoke"]}
        />
      </div>
    </div>
  );
}
