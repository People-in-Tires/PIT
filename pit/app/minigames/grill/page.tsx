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
  const sprites: string[] = 
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Copper_Beech_Fagus_sylvatica_f._purpurea_Autumn_Leaves_Closeup_3008px.jpg/960px-Copper_Beech_Fagus_sylvatica_f._purpurea_Autumn_Leaves_Closeup_3008px.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
    , "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Luchsfliege_Thereva_sp_02_%28MK%29.jpg/960px-Luchsfliege_Thereva_sp_02_%28MK%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
    , "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Trash_on_Queens_Day.jpg/960px-Trash_on_Queens_Day.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"];
  const [bugs, setBugs] = useState<React.JSX.Element[]>(() => {
    const tmpbugs = [];
    for (let i = 0; i < (metadata["litter"] as number); i++) {
      tmpbugs.push(
        <Grilllitter
          x={(Math.random() * 0.8 + 0.1) * window.outerHeight * .4}
          y={(Math.random() * 0.8 + 0.1) * window.outerHeight * .2}
          sprite={sprites[Math.round(Math.random() * (sprites.length - 1))]}
          key={i}
          index={`${i}`}
        />,
      );
    }
    return tmpbugs;
  });
  useEffect(() => {
    
  }, [])
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
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/CarGrill_0712_9128_%288314048101%29.jpg/960px-CarGrill_0712_9128_%288314048101%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
        alt="grill"
        id="Grill"
      />
      {bugs}
    </GrillContext>
  );
}
