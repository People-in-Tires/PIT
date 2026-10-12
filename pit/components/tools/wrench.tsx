import styles from "@/css/Game.module.css";
import AttachPoint from "../AttachPoint";
import { Item } from "../engine/itemStore";
import RotatePoint from "../RotatePoint";

export default function Wrench({ id, attachedTo, angle = 0, container }: Item) {
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
        src={"/elements/items/wrench.png"}
        style={{ height: "inherit", width: "inherit" }}
        alt="wrench"
      />
    </RotatePoint>
  );
}
