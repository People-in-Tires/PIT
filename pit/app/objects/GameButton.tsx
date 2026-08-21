import Image from "next/image";
import styles from "../Index.module.css";
import { createRef } from "react";
import Draggable from "react-draggable";
import React from "react";

export interface MiniGameProps {
  metadata: { [key: string]: number | string };
  setOutput: (input: number) => void;
}

export function GameWindow({
  child,
  setBool,
  id,
}: {
  child: React.JSX.Element;
  setBool: (index: number) => void;
  id: number;
}) {
  const ref = createRef<HTMLDivElement>();
  return (
    <Draggable handle={`#handle`} nodeRef={ref}>
      <div ref={ref} style={{ width: "600px", height: "420px" }}>
        <header id={`handle`} className={`${styles.GameFrameHeader}`}>
          <button
            onClick={() => {
              setBool(id);
            }}
          >
            <Image width={20} height={20} src={"/window.svg"} alt={"close"} />
          </button>
        </header>
        <div className={`${styles.GameFrame}`}>{child}</div>
      </div>
    </Draggable>
  );
}

export default function GameButton({
  img, //prob relpace with img object with already height etc
  open,
  setBool,
  id,
}: {
  img: string;
  open: boolean;
  setBool: (index: number) => void;
  id: number;
}) {
  return (
    <button
      disabled={open}
      onClick={() => {
        setBool(id);
      }}
      id={`${img} button`}
    >
      <div>
        <Image width={400} height={300} src={img} alt={img} draggable="false" />
      </div>
    </button>
  );
}
