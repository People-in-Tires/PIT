"use client";

import styles from "@/css/Game.module.css";
import { Item } from "../engine/itemStore";
import AttachPoint from "../AttachPoint";
import BoltGroup from "../BoltGroup";

export default function HardWheel({
  tightenedPer = 0,
  id,
  attachedTo,
  container,
  invSlot,
  disable_detail,
}: {} & Item) {
  const tag = `hardwheel${id}`;

  return (
    <div
      className={`${attachedTo ? "attached" : undefined}`}
      style={{ position: "absolute" }}
    >
      {!disable_detail && (
        <BoltGroup
          parentTag={tag}
          id={id}
          locations={[{ x: 50, y: 50 }]}
          tightenedPer={tightenedPer}
        />
      )}
      <img
        draggable={false}
        src={"/elements/wheels/HardWheel.png"}
        alt="hardwheel"
      ></img>
      <AttachPoint
        attachedTo={attachedTo}
        parentContainer={container}
        invslot={invSlot}
        tag={tag}
        style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
        target={["spoke"]}
      />
    </div>
  );
}
