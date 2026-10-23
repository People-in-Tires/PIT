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
  angleOffset = 0,
  setAngle,
  style,
  attachedTo,
  children,
  transformOriginX,
  transformOriginY,
  className = "",
  range,
  disabled,
  id,
}: {
  className?: string;
  angle: number;
  angleOffset?: number;
  setAngle?: (angle: number) => void;
  style?: CSSProperties;
  attachedTo?: string;
  transformOriginX: number;
  transformOriginY: number;
  range?: { min: number; max: number };
  disabled?: boolean;
  id?: number;
} & React.PropsWithChildren) {
  const update = useItemStore().update;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id && !attachedTo) update(id, { angle: 0 });
  }, [attachedTo]);

  function rotate(mouse: MouseEvent, Req: DOMRect) {
    let delta_rotation =
      getAngle(
        mouse.x,
        mouse.y,
        Req.x + Req.width / 2,
        Req.y + Req.height / 2,
      ) -
      90 -
      (angle + angleOffset);
    delta_rotation = ((delta_rotation + 180 + 360 * 69) % 360) - 180;
    if (delta_rotation < 5 && delta_rotation > -5)
      return [undefined, undefined];
    let result = angle + delta_rotation;
    if (range && result < range.min && delta_rotation < 0) result = range.min;
    else if (range && result > range.max && delta_rotation > 0)
      result = range.max;
    return [result, delta_rotation];
  }

  function rotateStatic(mouse: MouseEvent) {
    if (mouse == undefined || setAngle == undefined || ref.current == undefined)
      return;
    const [result] = rotate(mouse, ref.current.getBoundingClientRect());
    if (result) setAngle(result);
  }

  function rotateItem(mouse: MouseEvent) {
    if (mouse == undefined || id == undefined) return;
    const attachment = document.querySelectorAll(
      `[data-attach=${attachedTo}]`,
    )[0];
    if (!attachment) return;
    const [result, delta_rotation] = rotate(
      mouse,
      attachment.getBoundingClientRect(),
    );
    if (result) update(id, { angle: result });
    if (delta_rotation)
      attachment.dispatchEvent(
        new CustomEvent("rotate", {
          detail: { delta_rotation: delta_rotation },
        }),
      );
  }

  return (
    <DraggableCore
      onDrag={id != undefined ? rotateItem : rotateStatic}
      disabled={disabled}
      nodeRef={ref}
      handle={`#rotatehandle${id}`}
    >
      <div
        ref={ref}
        className={`${className}`}
        style={{
          ...style,
          position: "absolute",
          transformOrigin: `${transformOriginX}% ${transformOriginY}%`,
          height: "inherit",
          aspectRatio: "inherit",
          width: "inherit",
          rotate: `${angle + angleOffset}deg`,
        }}
      >
        {children}
        {!disabled && (
          <div
            id={`rotatehandle${id}`}
            style={{
              top: "110%",
              width: "120%",
              aspectRatio: "3/1",
              position: "absolute",
            }}
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
      </div>
    </DraggableCore>
  );
}
