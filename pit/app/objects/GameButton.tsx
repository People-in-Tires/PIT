import Image from "next/image";
import styles from "../Index.module.css";
import { createRef } from "react";
import Draggable from "react-draggable";
import React from "react";
import { HtmlProps } from "next/dist/shared/lib/html-context.shared-runtime";

export interface MiniGameProps {
  metadata: { [key: string]: number | string };
  setOutput: (input: number) => void;
}

export function GameWindow({
  setOutput,
  index,
  children,
}: {
  setOutput: (index: number) => void;
  index: number;
} & React.PropsWithChildren) {
  const ref = createRef<HTMLDivElement>();
  return (
    <Draggable handle={`#handle`} nodeRef={ref}>
      <div ref={ref} style={{ width: "600px", height: "420px" }}>
        <header id={`handle`} className={`${styles.GameFrameHeader}`}>
          <button
            onClick={() => {
              setOutput(index);
            }}
          >
            <Image width={20} height={20} src={"/window.svg"} alt={"close"} />
          </button>
        </header>
        <div className={`${styles.GameFrame}`}>{children}</div>
      </div>
    </Draggable>
  );
}

export default function GameButton({
  img, //prob relpace with img object with already height etc
  open,
  setBool,
  index,
  className,
}: {
  img: string;
  open: boolean;
  setBool: (index: number) => void;
  index: number;
  className: string;
}) {
  return (
    <button
      className={className}
      disabled={open}
      onClick={() => {
        setBool(index);
      }}
      id={`${img} button`}
    >
      <Image width={400} height={300} src={img} alt={img} draggable="false" />
    </button>
  );
}
