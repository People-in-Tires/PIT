"use client";

import { createContext, useLayoutEffect, useState } from "react";
import GameButton from "./UI/GameButton";
import styles from "@/css/Game.module.css";
import useCarStore, { ICar } from "./engine/carStore";
import { motion } from "motion/react";

const positions = [100, 20, -100];
export default function Car() {
  const [curPos, setCurPos] = useState(0);
  const car = useCarStore().in_stop;

  if (car && curPos == 0)
    setCurPos(1)
  else if (!car && curPos == 1) {
    setCurPos(2)
    setTimeout(() => {
      setCurPos(0)
    }, 1000);
  }
  if (curPos == 0) return <></>;
  return (
    <motion.div
      className={`${styles.car}`}
      style={{ width: "60cqw", height: `60cqh`, top: `20cqh` }}
      initial={{ left: `${positions[(curPos + 1) % 2]}cqw` }}
      animate={{ left: `${positions[curPos]}cqw` }}
      transition={{ ease: curPos > 1 ? "easeOut" : "easeIn", duration: 1 }}
    >
      <GameButton x={35} y={50} name="grill" />
      <GameButton x={60} y={45} name="wing" />
      <GameButton x={80} y={50} name="wheel" />
      <GameButton x={50} y={20} name="fuel" />
      <img
        draggable={false}
        src={"/elements/car2.png"}
        style={{ height: "inherit", width: "inherit" }}
        alt={"carbase"}
      />
    </motion.div>
  );
}
