"use client";

import styles from "@/css/Game.module.css";
import { Item } from "../engine/itemStore";
import AttachPoint from "../AttachPoint";
import BoltGroup from "../BoltGroup";

export default function WetWheel({
  tightenedPer = 0,
  id,
  attachedTo,
  angle,
}: {} & Item) {
  const tag = `wetwheel${id}`;

  return (
    <div
      className={`${styles.wheel} ${attachedTo ? "attached" : undefined}`}
      style={{
        height: "inherit",
        width: "inherit",
        aspectRatio: "inherit",
        rotate: `${angle}deg`,
        transformOrigin: "50% 50%",
      }}
    >
      <BoltGroup
        id={id}
        locations={[{ x: 50, y: 50 }]}
        tightenedPer={tightenedPer}
      />
      <img draggable={false} src={"/elements/wheels/WetWheel.png"}></img>
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
