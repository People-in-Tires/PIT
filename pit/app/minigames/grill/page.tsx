"use client";
import Image from "next/image";
import React, { createContext, useEffect } from "react";
import Grilllitter from "./GrillLitter";
import styles from "../../Index.module.css";
import { StateContext } from "@/app/page";
import { useState } from "react";
import { MiniGameProps } from "@/app/objects/GameButton";

export const GrillContext = createContext<StateContext | undefined>(undefined);

export default function GrillGame({ metadata, setOutput }: {} & MiniGameProps) {
  const sprites: string[] = ["/leaf.png", "/beer.png"];
  const [bugs, setBugs] = useState<React.JSX.Element[]>(() => {
    const tmpbugs = [];
    for (let i = 0; i < Number(metadata["litter"]); i++) {
      tmpbugs.push(
        <Grilllitter
          x={(Math.random() * 0.7 + 0.1) * 600}
          y={(Math.random() * 0.7 + 0.1) * 400}
          sprite={sprites[Math.round(Math.random() * (sprites.length - 1))]}
          key={i}
          index={`${i}`}
        />,
      );
    }
    return tmpbugs;
  });

  useEffect(() => {
    setOutput(bugs.length);
  }, [bugs]);

  return (
    <GrillContext value={{ state: bugs, setState: setBugs }}>
      <img
        className={`${styles.background}`}
        style={{
          width: "80%",
          height: "80%",
          left: "10%",
          top: "10%",
        }}
        draggable={false}
        src="/car2.png"
        alt="grill"
        id="Grill"
      />
      {bugs}
    </GrillContext>
  );
}
