"use client";

import { motion } from "motion/react";
import AttachPoint from "../AttachPoint";
import useCarStore from "../engine/carStore";
import useItemStore, { Item } from "../engine/itemStore";
import RotatePoint from "../RotatePoint";
import styles from "@/css/Game.module.css";
import { useEffect, useState } from "react";
export default function JerryCan({
  id,
  attachedTo,
  angle = 0,
  fullness = 0,
  fluid_cap = 0,
  container,
}: Item) {
  const tag = `jerrycan${id}`;
  const update = useItemStore().update;
  const addFuel = useCarStore().addFuel;
  const [flowrate, setFlowRate] = useState(0);
  const maxrate = 1 * 0.1 * fluid_cap;

  useEffect(() => {
    if (angle < -45) {
      const interval = setInterval(() => {
        if (attachedTo == undefined || fullness <= 0) return;
        const tmpRate =
          ((-angle - 45 - ((fluid_cap - fullness) / fluid_cap) * 90) / 90) *
          0.1 *
          fullness;
        console.log(tmpRate, maxrate);

        setFlowRate(tmpRate);
        update(id, { fullness: fullness - tmpRate });
        addFuel(tmpRate);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [angle, fullness, attachedTo, id, update, addFuel]);

  return (
    <RotatePoint
      range={{ min: -135, max: 0 }}
      angle={angle}
      attachedTo={attachedTo}
      transformOriginX={20}
      transformOriginY={20}
      disabled={attachedTo != undefined && attachedTo.includes("bolt")}
      id={id}
    >
      <motion.div
        style={{
          position: "absolute",
          backgroundColor: "yellow",
          height: "2cqw",
          top: "0px",
          aspectRatio: "1/1",
        }}
        initial={{ clipPath: "circle(0%)" }}
        animate={{
          clipPath: `circle(${angle < -45 ? (flowrate / maxrate) * 100 : 0}%)`,
        }}
      ></motion.div>
      <div
        id="jerrycan"
        style={{ height: "inherit", width: "inherit", aspectRatio: "inherit" }}
      >
        <AttachPoint
          attachedTo={attachedTo}
          parentContainer={container}
          style={{ height: "20%", width: "20%", left: "10%", top: "10%" }}
          target={["fuelhole", "tap"]}
          tag={tag}
        />
        <img
          src={"/elements/items/jerrycant.png"}
          alt="jerrycan"
          style={{ height: "100%", width: "100%" }}
          draggable={false}
        />
      </div>
    </RotatePoint>
  );
}
