"use client";
import { cloneElement, useContext, useRef } from "react";
import Draggable, { DraggableProps } from "react-draggable";
import { useState } from "react";
import { ControlPosition, DraggableData } from "react-draggable";
import { DraggableItemProps } from "./item";
import styles from "@/css/Game.module.css";
import addTo from "@/lib/libft/addTo";
import { GameWindowContext } from "@/context/gamewindow";

export default function DraggableItem({
  children,
  onDrag,
  onStop,
  onStart,
  nodeRef,
  defaultPosition,
  handle,
  axis,
  disabled,
  canbechildof,
}: DraggableItemProps) {
  const [position, setPosition] = useState<ControlPosition>(
    defaultPosition ? defaultPosition : { x: 0, y: 0 },
  );
  const xoffset = useRef(0);
  const yoffset = useRef(0);

  const newPosition = (newValue: ControlPosition) => {
    const tmp_position = structuredClone(position);
    if (axis == "x" || axis == "both" || axis == undefined)
      tmp_position.x = newValue.x - xoffset.current;
    if (axis == "y" || axis == "both" || axis == undefined)
      tmp_position.y = newValue.y - yoffset.current;
    setPosition(tmp_position);
  };

  function onStartWrap(event: MouseEvent, data: DraggableData) {
    if (
      nodeRef.current?.parentElement?.className.includes(`${styles.inventory}`)
    )
      addTo(data.node, `${styles.gameview}`, undefined, 0);
    xoffset.current = event.clientX - data.x;
    yoffset.current = event.clientY - data.y;
    newPosition({ x: event.clientX, y: event.clientY });
    if (onStart) onStart(event, data);
  }
  function onDragWrap(event: MouseEvent, data: DraggableData) {
    newPosition({ x: event.clientX, y: event.clientY });
    if (onDrag) onDrag(event, data);
  }
  function onStopWrap(event: MouseEvent, data: DraggableData) {
    newPosition({ x: event.clientX, y: event.clientY });
    addTo(data.node, `${styles.inventory}`);
    if (onStop) onStop(event, data);
  }

  return (
    <Draggable
      position={position}
      nodeRef={nodeRef}
      onDrag={onDragWrap}
      onStart={onStartWrap}
      onStop={onStopWrap}
      handle={handle}
      axis={axis}
      disabled={disabled}
    >
      {children}
    </Draggable>
  );
}
