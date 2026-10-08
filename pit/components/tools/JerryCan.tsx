"use client";

import { motion } from "motion/react";
import AttachPoint from "../AttachPoint";
import { CarContext } from "../car";
import useCarStore from "../engine/carStore";
import useItemStore, { Item } from "../engine/itemStore";
import RotatePoint from "../RotatePoint";
import styles from "@/css/Game.module.css";
import { useContext, useEffectEvent, useRef, useState } from "react";
import { useEffect } from "react";
export const jerrymax = 20000; //in milliliters
export default function JerryCan({
  id,
  attachedTo,
  angle = 0,
  fullness = 0,
  fluid_cap,
  handle,
}: Item) {
  const tag = `jerrycan${id}`;
  const update = useItemStore().update;
  const addFuel = useCarStore().addFuel;
  const car = useContext(CarContext);
  let parent;
  if (attachedTo instanceof Element)
    parent = attachedTo?.className.includes("fuelhole");

  useEffect(() => {
    if (angle < -45) {
      const interval = setInterval(() => {
        if (attachedTo == undefined || car == undefined || fullness <= 0)
          return;
        const diff =
          ((-angle - 45 - ((jerrymax - fullness) / jerrymax) * 90) / 90) *
          0.1 *
          fullness;
        if (diff > 0) {
          update(id, { fullness: fullness - diff });
          addFuel(diff);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [angle, fullness, attachedTo, car, id, update, addFuel, parent]);

  return (
    <RotatePoint
      range={{ min: -135, max: 0 }}
      className={`${styles.tool} ${styles.jerrycan}`}
      angle={angle}
      attachedTo={attachedTo}
      tag={tag}
      transformOrigin="20% 10%"
      disabled={parent != true}
      id={id}
    >
      <div
        id="jerrycan"
        style={{ height: "inherit", width: "inherit", aspectRatio: "inherit" }}
      >
        <AttachPoint
          attachedTo={attachedTo}
          detachondrop={false}
          style={{ height: "20%", width: "20%", left: "10%", top: "10%" }}
          target={["fuelhole", "tap"]}
          offsetParent={{ x: 0.1, y: 0.1 }}
          tag={tag}
        />
        <img
          src={"/elements/items/jerrycant.png"}
          style={{ height: "100%", width: "100%" }}
          draggable={false}
        />
        <motion.div
          style={{
            borderTopLeftRadius: "50%",
            borderTopRightRadius: "50%",
            height: "100%",
            width: "50%",
            borderBottom: "0%",
          }}
          initial={{ border: "0% solid yellow" }}
          animate={{ border: `${(angle / 90) * 50}% solid yellow` }}
        ></motion.div>
      </div>
    </RotatePoint>
  );
}
