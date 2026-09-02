"use client";
import { cloneElement, useContext, useRef, useEffect } from "react";
import Draggable, { DraggableProps } from "react-draggable";
import { useState } from "react";
import { ControlPosition, DraggableData } from "react-draggable";
import { DraggableItemProps } from "./item";
import styles from "@/css/Game.module.css";
import addTo from "@/lib/libft/addTo";
import overlap from "@/lib/libft/overlap";

export default function DraggableItem({
  children,
  onDrag,
  onStop,
  onStart,
  onAttachDrag,
  onAttachStop,
  onAttachStart,
  nodeRef,
  defaultPosition = { x: 0, y: 0 },
  handle,
  axis,
  disabled,
  attachStart,
  attachTarget,
  attachParentTarget,
  attachOffset,
  attachHitbox,
  setAttachRef,
  dettachOnStart = true,
}: DraggableItemProps) {
  const [position, setPosition] = useState<ControlPosition>(defaultPosition);
  const [attached, setAttached] = useState<boolean>(attachStart ? true : false);
  const attachRef = useRef<Element>(attachStart);
  const xoffset = useRef(0);
  const yoffset = useRef(0);

  const newPosition = (newValue: ControlPosition) => {
    if (attachRef.current != undefined) return;
    const tmp_position = structuredClone(position);
    if (axis == "x" || axis == "both" || axis == undefined)
      tmp_position.x = newValue.x - xoffset.current;
    if (axis == "y" || axis == "both" || axis == undefined)
      tmp_position.y = newValue.y - yoffset.current;
    setPosition(tmp_position);
  };

  function onStartWrap(event: MouseEvent, data: DraggableData) {
    if ((!onAttachStart || !attached) && onStart) onStart(event, data);
    else if (attached && onAttachStart) onAttachStart(event, data);
    if (
      nodeRef.current?.parentElement?.className.includes(`${styles.inventory}`)
    )
      addTo(data.node, `${styles.gameview}`, undefined, 0);
    if (dettachOnStart && attachRef.current) updateAttached(undefined);
    xoffset.current = event.clientX - data.x;
    yoffset.current = event.clientY - data.y;
    newPosition({ x: event.clientX, y: event.clientY });
  }

  function onDragWrap(event: MouseEvent, data: DraggableData) {
    if (onDrag && (!attached || !onAttachDrag)) onDrag(event, data);
    else if (onAttachDrag && attached) onAttachDrag(event, data);
    newPosition({ x: event.clientX, y: event.clientY });
  }

  function onStopWrap(event: MouseEvent, data: DraggableData) {
    if ((!onAttachStop || !attached) && onStop) onStop(event, data);
    else if (attached && onAttachStop) onAttachStop(event, data);
    newPosition({ x: event.clientX, y: event.clientY });
    if (attachTarget) {
      if (!dettachOnStart && attached) updateAttached(undefined);
      else {
        if (attachHitbox && attachHitbox.current)
          updateAttached(
            overlap(attachHitbox.current, attachTarget, attachParentTarget),
          );
        else
          updateAttached(overlap(data.node, attachTarget, attachParentTarget));
        if (attachRef.current != undefined && nodeRef.current != undefined) {
          const attachRect = attachRef.current.getBoundingClientRect();
          const nodeRect = nodeRef.current.getBoundingClientRect();
          if (attachOffset)
            setPosition({
              x: attachRect.x + attachRect.width / 2 - attachOffset.x,
              y: attachRect.y + attachRect.height / 2 - attachOffset.y,
            });
          else
            setPosition({
              x: attachRect.x + attachRect.width / 2 - nodeRect.width / 2,
              y: attachRect.y + attachRect.height / 2 - nodeRect.width / 2,
            });
        }
      }
    }
    addTo(data.node, `${styles.inventory}`);
  }

  function updateAttached(node: Element | undefined) {
    setAttached(node ? true : false);
    if (setAttachRef) setAttachRef(node);
    attachRef.current = node;
  }
  return (
    <Draggable
      position={position}
      nodeRef={nodeRef}
      onDrag={onDragWrap}
      onStart={onStartWrap}
      onStop={onStopWrap}
      handle={handle}
      axis={attached ? "none" : axis}
      disabled={disabled}
      defaultClassName={attached ? "attached" : undefined}
    >
      {children}
    </Draggable>
  );
}
