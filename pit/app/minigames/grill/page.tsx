"use client";
import Image from "next/image";
import React from "react";
import GrillLitter from "./GrillLitter";
import styles from "../../Index.module.css";

import { useState } from "react";

export default function GrillGame() {
  const sprites: string[] = ["/leaf.png", "/beer.png"];
  const litter = 20;
  const [bugs] = useState<React.JSX.Element[]>(() => {
    const tmpbugs: React.JSX.Element[] = [];
    for (let i = 0; i < litter; i++) {
      tmpbugs.push(
        <GrillLitter
          x={Math.random() * 70 + 10}
          y={Math.random() * 70 + 10}
          sprite={sprites[Math.round(Math.random() * (sprites.length - 1))]}
        />,
      );
    }
    return tmpbugs;
  });
  return (
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
  );
}
