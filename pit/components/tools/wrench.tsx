import { useState } from "react";

import styles from "@/css/Game.module.css";
import AttachPoint from "../AttachPoint";
import { Item } from "../engine/itemStore";
import RotatePoint from "../RotatePoint";

export default function Wrench({ id, attachedTo, angle = 0 }: Item) {
  const tag = `wrench${id}`;

  return (
    <RotatePoint
      className={`${styles.wrench} ${styles.tool} ${attachedTo ? "attached" : undefined}`}
      angle={angle}
      attachedTo={attachedTo}
      disabled={attachedTo == undefined}
      tag={tag}
      transformOrigin="50% 10%"
      id={id}
    >
      <AttachPoint
        attachedTo={attachedTo}
        tag={tag}
        style={{ height: "10%", width: "50%", left: "25%", top: "5%" }}
        target={[styles.bolt]}
        targetParent={"attached"}
        offsetParent={{ x: 0.5, y: 0.1 }}
      />
      <div
        id={"handle"}
        style={{
          position: "absolute",
          height: "55%",
          left: "10%",
          width: "80%",
          bottom: "0%",
        }}
      />
      <img
        src={"/wrench.png"}
        style={{ height: "inherit", width: "inherit" }}
      />
    </RotatePoint>
  );
}
