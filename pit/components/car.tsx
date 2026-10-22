"use client";

import { createContext, useLayoutEffect, useState } from "react";
import GameButton from "./UI/GameButton";
import styles from "@/css/Game.module.css";
import useCarStore, { ICar } from "./engine/carStore";
import { motion } from "motion/react";
import Image from "next/image";

const positions = [100, 20, -100];
export default function Car() {
  const car = useCarStore().in_stop;
  const [curPos, setCurPos] = useState(car ? 1 : 0);
  if (car && curPos == 0) setCurPos(1);
  else if (!car && curPos == 1) {
    setCurPos(2);
    setTimeout(() => {
      setCurPos(0);
    }, 1000);
  }
  if (curPos == 0 || !car) return <></>;
  return (
    <motion.div
      style={{
        width: "60cqw",
        height: `60cqh`,
        bottom: `10cqw`,
        position: "absolute",
      }}
      initial={{ left: `${positions[curPos + 1] % 3}cqw` }}
      animate={{ left: `${positions[curPos]}cqw` }}
      transition={{ ease: curPos > 1 ? "easeOut" : "easeIn", duration: 1 }}
    >
      <GameButton x={35} y={50} height={10} width={10} name="grill" />
      <GameButton x={60} y={45} height={10} width={10} name="wing" />
      <GameButton x={80} y={50} height={10} width={10} name="wheel" />
      <GameButton x={50} y={20} height={10} width={10} name="fuel" />
      <Image
        draggable={false}
        height={200}
        width={200}
        src={"/elements/car2.png"}
        style={{ height: "100%", width: "100%" }}
        alt={"carbase"}
      />
      {car.car_number}
    </motion.div>
  );
}
