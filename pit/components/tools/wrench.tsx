import { useEffect, useState } from "react";

import styles from "@/css/Game.module.css";
import getAngle from "@/lib/libft/getangle";
import {
  registerDragHandler,
  Handler,
  unregisterDragHandler,
  action,
} from "../engine/itemHandlerRegistry";
import AttachPoint from "../AttachPoint";
import useItemStore, { Item } from "../engine/itemStore";
import RotatePoint from "../RotatePoint";

export default function Wrench({ id, attachedTo, angle }: Item) {
  const [attached, setAttached] = useState<boolean>(attachedTo ? true : false);
  const tag = `wrench${id}`;

  return (
    <div
      className={`${styles.wrench} ${styles.tool} ${attached ? "attached" : undefined}`}
    >
      <RotatePoint
        angle={angle!}
        attachedTo={attachedTo}
        tag={tag}
        transformOrigin="50% 10%"
      >
        <AttachPoint
          detachondrop={true}
          attachedTo={attachedTo}
          tag={tag}
          setAttached={setAttached}
          style={{ height: "10%", width: "50%", left: "25%", top: "5%" }}
          target={styles.bolt}
          targetParent={"attached"}
          offsetParent={{ x: 0.5, y: 0.1 }}
        />
        <div
          id={"handle"}
          style={{
            position: "absolute",
            height: "40%",
            width: "100%",
            top: "55%",
          }}
        />
        <div
          style={{
            backgroundImage: `url("/wrench.svg")`,
            backgroundSize: `contain`,
            backgroundRepeat: `no-repeat`,
            height: "100%",
          }}
        />
      </RotatePoint>
    </div>
  );
}
