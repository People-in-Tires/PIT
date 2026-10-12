import { CSSProperties, useEffect } from "react";
import useItemStore from "./engine/itemStore";
import RenderItem, { RenderAttach } from "./engine/RenderItem";
import { useState } from "react";
import overlap from "@/lib/libft/overlap";
import { overlap_rects } from "@/lib/libft/overlap";
import styles from "@/css/Game.module.css";
import { Ref } from "react";
import { Tagesschrift } from "next/font/google";

let next_id = 0;
export function getAttachID() {
  return next_id++;
}

export function findAttachSingle(attach: Element, target: Element) {
  const attachReq = attach.getBoundingClientRect();
  if (!target) return undefined;
  if (overlap_rects(attachReq, target.getBoundingClientRect())) return target;
  return undefined;
}

export function findAttach(
  attach: Element,
  target: string,
  targetParent: string | undefined,
) {
  console.log(attach, target, targetParent);
  const parentNodes = targetParent
    ? document.getElementsByClassName(targetParent)
    : [document];
  for (const parentNode of parentNodes) {
    const destinationNodes = parentNode.querySelectorAll(
      `[data-attach|=${target}]`,
    );
    if (destinationNodes)
      for (const destinationNode of destinationNodes) {
        if (destinationNode.getAttribute("data-attach")?.includes(target)) {
          const result = findAttachSingle(attach, destinationNode);
          if (result != undefined) return result;
        }
      }
  }
  console.log(attach, target, targetParent);
  return undefined;
}
//have an offset
export default function AttachmentPoint({
  tag,
  style,
  ref,
}: {
  tag: string;
  style: CSSProperties;
  ref?: Ref<HTMLDivElement>;
}) {
  const element = useItemStore().items.filter(
    (value) => value.attachedTo == tag,
  );
  const offset =
    element.length > 0 && element[0].offset
      ? element[0].offset
      : { x: 0, y: 0 };

  return (
    <div style={style} ref={ref} data-attach={tag} className={styles.hitbox}>
      {element[0] && (
        <RenderAttach
          item={{
            ...element[0],
            x: element[0].x + offset.x,
            y: element[0].y + offset.y,
          }}
        />
      )}
    </div>
  );
}
