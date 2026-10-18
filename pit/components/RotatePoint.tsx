"use client";

import { CSSProperties, useRef } from "react";
import { motion } from "motion/react";
import { useEffect } from "react";
import getAngle from "@/lib/libft/getangle";
import useItemStore from "./engine/itemStore";
import styles from "@/css/Game.module.css";
import { DraggableCore } from "react-draggable";

export default function RotatePoint({
  angle,
  setAngle,
  style,
  attachedTo,
  children,
  transformOrigin,
  className,
  range,
  disabled,
  id,
}: {
  className: string;
  angle: number;
  setAngle?: (angle: number)=>void;
  style?: CSSProperties;
  attachedTo?: string;
  transformOrigin: string;
  range?: { min: number; max: number };
  disabled?: boolean;
  id?: number;
} & React.PropsWithChildren) {
  const update = useItemStore().update;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id && !attachedTo) update(id, { angle: 0 });
  }, [attachedTo]);

  function rotate(mouse: MouseEvent) {
    if (mouse == undefined) return;
    const attachment = document.querySelectorAll(
      `[data-attach=${attachedTo}]`,
    )[0];
    const attachReq = attachment.getBoundingClientRect();
    let delta_rotation =
      (getAngle(
        mouse.x,
        mouse.y,
        attachReq.x + attachReq.width / 2,
        attachReq.y + attachReq.height / 2,
      ) %
        360) -
      (angle % 360) -
      90;
    if (delta_rotation < 5 && delta_rotation > -5) return;
    if (delta_rotation > 180) delta_rotation -= 360;
    else if (delta_rotation < -180) delta_rotation += 360;
    let result = angle + delta_rotation;
    if (range && result < range.min && delta_rotation < 0) result = range.min;
    else if (range && result > range.max && delta_rotation > 0)
      result = range.max;
    if (id) update(id, { angle: result });
    else if (setAngle) setAngle(result);
    attachment.dispatchEvent(
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
      <motion.div
        ref={ref}
        className={`${className} ${styles.rotatable}`}
        style={{
          ...style,
          transformOrigin: transformOrigin,
          height: "inherit",
          aspectRatio: "inherit",
          width: "inherit",
        }}
        initial={{ rotate: "0deg" }}
        animate={{ rotate: `${angle}deg` }}
        transition={{ease: "linear"}}
      >
        {children}
        {!disabled && (
          <div
            id="rotatehandle"
            style={{ top: "110%", width: "120%", aspectRatio: "3/1" }}
            className={styles.hitbox} //have it be arrows left and right slightly bent
          >
            <img
              src={"/ui/rotate_arrow.png"}
              draggable={false}
              alt="arrowright"
              style={{
                position: "absolute",
                top: "-10%",
                left: "50%",
                width: "40%",
                aspectRatio: "1",
              }}
            />
            <img
              src={"/ui/rotate_arrow.png"}
              alt="arrowleft"
              draggable={false}
              style={{
                position: "absolute",
                top: "-10%",
                width: "40%",
                aspectRatio: "1",
                transform: "scaleX(-1)",
              }}
            />
          </div>
        )}
      </motion.div>
    </DraggableCore>
  );
}
