import { CSSProperties } from "react";
import { useItemsAttach } from "./engine/itemStore";
import { RenderAttach } from "./engine/RenderItem";
import { overlap_rects } from "@/lib/libft/overlap";
import styles from "@/css/Game.module.css";
import { Ref } from "react";

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
  console.log(parentNodes);
  for (const parentNode of parentNodes) {
    const destinationNodes = parentNode.querySelectorAll(
      `[data-attach|=${target}]`,
    );
    if (destinationNodes)
      for (const destinationNode of destinationNodes) {
        const result = findAttachSingle(attach, destinationNode);
        if (result != undefined) return result;
      }
  }
  console.log(attach, target, targetParent);
  return undefined;
}
//have an offset
export default function AttachmentPoint({
  parentTag,
  tag,
  style,
  ref,
  parentOffset = { x: 0, y: 0 },
}: {
  parentTag?: string;
  tag: string;
  style: CSSProperties;
  ref?: Ref<HTMLDivElement>;
  parentOffset?: { x: number; y: number };
}) {
  const tagself = `${tag}${parentTag ? parentTag : ""}`;
  const element = useItemsAttach(tagself)[0];
  const offset =
    element != undefined && element.offset
      ? {
          x: element.offset.x + parentOffset.x,
          y: element.offset.y + parentOffset.y,
        }
      : { x: 0, y: 0 };

  return (
    <div
      style={style}
      ref={ref}
      data-attach={tagself}
      className={styles.hitbox}
    >
      {element && (
        <RenderAttach
          item={{
            ...element,
            offset: offset,
            x: 0,
            y: 0,
          }}
        />
      )}
    </div>
  );
}
