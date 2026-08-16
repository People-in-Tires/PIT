"use client";
import Image from "next/image";
import React, { createContext, useEffect } from "react";
import Grilllitter from "./GrillLitter";
import styles from "../../Index.module.css";
import { StateContext } from "@/app/page";
import { useState } from "react";
import { parseMetadata } from "@/app/objects/functions";

export const GrillContext = createContext<StateContext | undefined>(undefined);

export default function GrillGame() {
  const sprites: string[] = ["/leaf.png", "/beer.png"];
  const [bugs, setBugs] = useState<React.JSX.Element[]>(() => {
    const data = parseMetadata(location.href);
    const tmpbugs = [];
    for (let i = 0; i < Number(data["litter"]); i++) {
      tmpbugs.push(
        <Grilllitter
          x={Math.random() * 70 + 10}
          y={Math.random() * 70 + 10}
          sprite={sprites[Math.round(Math.random() * (sprites.length - 1))]}
          key={i}
          index={`${i}`}
        />,
      );
    }
    return tmpbugs;
  });

  useEffect(() => {
    window.parent.postMessage(bugs.length);
  }, [bugs]);

  return (
    <GrillContext value={{ state: bugs, setState: setBugs }}>
      <div
        id={"GrillWindow"}
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Image
          className={`${styles.background}`}
          style={{
            borderWidth: "5px",
            borderColor: "rgb(255, 0, 0)",
            left: "10%",
            top: "10%",
            width: "80%",
            height: "80%",
          }}
          draggable={false}
          width={100}
          height={100}
          src="/beer.png"
          alt="grill"
          id="Grill"
        />
        {bugs}
      </div>
    </GrillContext>
  );
}
