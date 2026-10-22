"use client";

import styles from "@/css/Game.module.css";
import { Item } from "../engine/itemStore";
import AttachPoint from "../AttachPoint";
import BoltGroup from "../BoltGroup";

export default function WetWheel({
  tightenedPer = 0,
  id,
  attachedTo,
  container,
  disable_detail,
}: {} & Item) {
  const tag = `wetwheel${id}`;

  return (
    <div
      className={`${attachedTo ? "attached" : undefined}`}
      style={{ position: "absolute" }}
    >
      {!disable_detail && (
        <BoltGroup
          parentTag={tag}
          id={id}
          locations={[{ x: 55, y: 35 }]}
          tightenedPer={tightenedPer}
        />
      )}
      <img draggable={false} src={"/elements/wheels/WetWheel.png"}></img>
      <AttachPoint
        attachedTo={attachedTo}
        parentContainer={container}
        tag={tag}
        style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
        target={["spoke"]}
      />
    </div>
  );
}
