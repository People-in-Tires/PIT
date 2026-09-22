"use client";

import { useRef, useState } from "react";
import { useEffect } from "react";
import {
  Handler,
  action,
  registerDragHandler,
  unregisterDragHandler,
} from "@/components/engine/itemHandlerRegistry";
import getAngle from "@/lib/libft/getangle";
import useItemStore from "./engine/itemStore";
import styles from "@/css/Game.module.css";
import Draggable, { DraggableCore } from "react-draggable";

export default function RotatePoint({
  angle,
  attachedTo,
  tag,
  children,
  transformOrigin,
  className,
  range,
  disabled,
  id,
}: {
  className: string;
  angle: number;
  attachedTo?: Element;
  tag: string;
  transformOrigin: string;
  range?: { min: number; max: number };
  disabled?: boolean;
  id: number;
} & React.PropsWithChildren) {
  const update = useItemStore().update;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id && !attachedTo) update(id, { angle: 0 });
  }, [attachedTo]);

  function rotate(mouse: MouseEvent) {
    if (mouse == undefined || attachedTo == undefined) return;
    const attachReq = attachedTo.getBoundingClientRect();
    let delta_rotation =
      getAngle(
        mouse.x,
        mouse.y,
        attachReq.x + attachReq.width / 2,
        attachReq.y + attachReq.height / 2,
      ) -
      angle -
      90;
    if (delta_rotation > 180) delta_rotation -= 360;
    else if (delta_rotation < -180) delta_rotation += 360;
    let result = angle + delta_rotation;
    if (range && result < range.min && delta_rotation < 0) result = range.min;
    else if (range && result > range.max && delta_rotation > 0)
      result = range.max;
    if (id) update(id, { angle: result });
    attachedTo.dispatchEvent(
      new CustomEvent("rotate", {
        detail: { delta_rotation: delta_rotation },
      }),
    );
  }

  return (
    <DraggableCore
      onDrag={rotate}
      disabled={disabled}
      nodeRef={ref}
      handle={"#rotatehandle"}
    >
      <div
        ref={ref}
        className={`${className} ${styles.rotatable}`}
        style={{ rotate: `${angle}deg`, transformOrigin: transformOrigin }}
      >
        {children}
        {!disabled && (
          <div
            id="rotatehandle"
            style={{ top: "110%", width: "120%", aspectRatio: "3/1" }}
            className={styles.hitbox} //have it be arrows left and right slightly bent
          >
            <img src={"/rotate_arrow.png"} style={{top: "-10%", left: "50%", width: "40%", aspectRatio:"1"}} />
            <img src={"/rotate_arrow.png"} style={{top: "-10%", width: "40%", aspectRatio:"1", transform: "scaleX(-1)"}} />
          </div>
        )}
      </div>
    </DraggableCore>
  );
}
