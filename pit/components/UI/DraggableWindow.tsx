"use client";
import styles from "@/css/Game.module.css";
import { createRef, useState } from "react";
import Draggable from "react-draggable";
import React from "react";
import { useItems } from "../engine/itemStore";
import RenderItem from "../engine/RenderItem";
import useCarStore from "../engine/carStore";
import PressButton from "./PressButton";
import ToggleButton from "./ToggleButton";

export default function DraggableWindow({
  closeWindow,
  name,
  slot,
  children,
  height,
  width,
  initialPosition,
}: {
  initialPosition: { x: number; y: number };
  height: number;
  width: number;
  slot?: number;
  closeWindow: (value: boolean) => void;
  name: string;
} & React.PropsWithChildren) {
  const ref = createRef<HTMLDivElement>();
  const tag = useCarStore().tag;
  const items = useItems(tag!);
  const [minimized, setMinimized] = useState(false);

  return (
    <Draggable
      handle={`#windowhandle`}
      nodeRef={ref}
      positionOffset={initialPosition}
    >
      <div
        ref={ref}
        style={{
          zIndex: "1",
          position: "absolute",
          height: `fit-content`,
          width: `fit-content`,
          backgroundColor: "grey",
          borderTopColor: "lightgrey",
          borderLeftColor: "lightgrey",
          borderRightColor: "darkgrey",
          borderBottomColor: "darkgrey",
          borderWidth: "0.5cqw",
        }}
      >
        <header
          id={`windowhandle`}
          style={{
            height: `2cqh`,
            width: "100%",
            font: "100% FireSans",
            backgroundColor: "darkblue",
          }}
        >
          {`${name}`}
          <PressButton
            onClick={() => closeWindow(false)}
            imgSrcs={["/ui/exit.svg"]}
          />
          <ToggleButton
            onClick={() => setMinimized((prevValue) => !prevValue)}
            reset="onRepeat"
            imgSrcs={["/ui/minimize.svg"]}
          />
        </header>
        {!minimized &&
          (slot != undefined ? (
            <div
              data-container={tag}
              data-slot={slot}
              style={{
                margin: "0.5cqw",
                backgroundColor: "grey",
                borderTopColor: "lightgrey",
                borderLeftColor: "lightgrey",
                borderRightColor: "darkgrey",
                borderBottomColor: "darkgrey",
                borderWidth: "0.5cqw",
                position: "relative",
                height: `${height}cqw`,
                width: `${width}cqw`,
              }}
            >
              {children}
              {items
                .filter((item) => item.invSlot === slot)
                .map((item) => (
                  <RenderItem key={item.id} item={item} />
                ))}
            </div>
          ) : (
            <div
              style={{
                margin: "0.5cqw",
                backgroundColor: "grey",
                borderTopColor: "lightgrey",
                borderLeftColor: "lightgrey",
                borderRightColor: "darkgrey",
                borderBottomColor: "darkgrey",
                borderWidth: "0.5cqw",
                position: "relative",
                height: `${height}cqw`,
                width: `${width}cqw`,
              }}
            >
              {children}
            </div>
          ))}
      </div>
    </Draggable>
  );
}
