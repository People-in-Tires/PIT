"use client";

import styles from "@/css/Game.module.css";
import useItemStore, { Item } from "../engine/itemStore";
import AttachPoint from "../AttachPoint";
import RotatePoint from "../RotatePoint";
import { useEffect } from "react";
import { maxGeneratorDuration } from "motion";

export default function SoftWheel({
  id,
  attachedTo,
  container,
  angle = 0,
}: {} & Item) {
  const tag = `softwheel${id}`;
  const update = useItemStore().update;

  useEffect(() => {
    if (angle > 270) update(id, { tightenedPer: 1 });
    else update(id, { tightenedPer: 0 });
  }, [id, angle, update]);

  return (
    <RotatePoint
      disabled={attachedTo == undefined}
      range={{ max: 360, min: -360 }}
      angle={angle}
      transformOriginX={50}
      transformOriginY={20}
    >
      <div id={"wheelhandle"}>
        <img
          draggable={false}
          src={"/elements/wheels/SoftWheel.png"}
          alt="softwheel"
        />
        <AttachPoint
          attachedTo={attachedTo}
          parentContainer={container}
          tag={tag}
          style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
          target={["spoke"]}
        />
      </div>
    </RotatePoint>
  );
}
