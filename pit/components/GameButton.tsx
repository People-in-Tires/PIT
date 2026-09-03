import Image from "next/image";
import styles from "@/css/Game.module.css";
import { createRef } from "react";
import Draggable from "react-draggable";
import React from "react";
import { HtmlProps } from "next/dist/shared/lib/html-context.shared-runtime";
import { ItemProps } from "./item";

export type PITMetaData = number | string | React.JSX.Element | null;
export interface MiniGameProps {
  metadata: { [key: string]: PITMetaData };
  setOutput: (input: PITMetaData) => void;
}

export function GameWindow({
  closeWindow,
  index,
  children,
}: {
  closeWindow: (index: number, value: boolean) => void;
  index: number;
} & React.PropsWithChildren) {
  const ref = createRef<HTMLDivElement>();
  return (
    <Draggable handle={`#handle`} nodeRef={ref}>
      <div ref={ref} className={`${styles.GameFrame}`}>
        <header id={`handle`} className={`${styles.GameFrameHeader}`}>
          <button
            onClick={() => {
              closeWindow(index, false);
            }}
          >
            <Image width={20} height={20} src={"/window.svg"} alt={"close"} />
          </button>
        </header>
        <div className={`${styles.GameWindow}`}>{children}</div>
      </div>
    </Draggable>
  );
}
//return array of components with the window with conditional in there
export default function GameButton({
  img, //prob relpace with img object with already height etc
  open,
  openWindow,
  index,
  x,
  y,
}: {
  img: string;
  open: boolean | boolean[];
  openWindow: (index: number | number[], value: boolean) => void;
  index: number | number[];
} & ItemProps) {
  return (
    <div
      style={{ left: `${x}px`, top: `${y}px` }}
      className={`${styles.GameButton}`}
    >
      <button
        disabled={
          typeof open === "boolean"
            ? (open as boolean)
            : (open as boolean[]).every((v) => v === true)
        }
        onClick={() => {
          openWindow(index, true);
        }}
        id={`${img} button`}
      >
        <Image width={400} height={300} src={img} alt={img} draggable="false" />
      </button>
    </div>
  );
}
