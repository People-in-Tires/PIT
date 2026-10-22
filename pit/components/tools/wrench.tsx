import styles from "@/css/Game.module.css";
import AttachPoint from "../AttachPoint";
import { Item } from "../engine/itemStore";
import RotatePoint from "../RotatePoint";
import { useEffect } from "react";

export default function Wrench({ id, attachedTo, angle = 0, container }: Item) {
  const tag = `wrench${id}`;

  return (
    <RotatePoint
      className={`${attachedTo ? "attached" : undefined}`}
      angle={angle}
      angleOffset={0}
      attachedTo={attachedTo}
      disabled={attachedTo == undefined}
      transformOriginX={50}
      transformOriginY={10}
      id={id}
    >
      <AttachPoint
        attachedTo={attachedTo}
        parentContainer={container}
        tag={tag}
        style={{ height: "10%", width: "50%", left: "25%", top: "5%" }}
        target={["bolt"]}
        targetParent={"attached"}
      />
      <div
        id={"wrenchhandle"}
        style={{
          position: "absolute",
          height: "55%",
          left: "10%",
          width: "80%",
          bottom: "0%",
        }}
      />
      <img
        draggable={false}
        src={"/elements/items/wrench.png"}
        style={{ height: "inherit", width: "inherit" }}
        alt="wrench"
      />
    </RotatePoint>
  );
}
