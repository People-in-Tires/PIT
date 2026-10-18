"use client";

import styles from "@/css/Game.module.css";
import { Item } from "../engine/itemStore";
import AttachPoint from "../AttachPoint";
import BoltGroup from "../BoltGroup";

export default function HardWheel({
  tightenedPer = 0,
  id,
  attachedTo,
}: {} & Item) {
  const tag = `hardwheel${id}`;

  return (
    <div className={`${styles.wheel} ${attachedTo ? "attached" : undefined}`}>
      <BoltGroup
        id={id}
        locations={[{ x: 50, y: 50 }]}
        tightenedPer={tightenedPer}
      />
      <img
        draggable={false}
        src={"/elements/wheels/HardWheel.png"}
        alt="hardwheel"
      ></img>
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
