"use client";

import AttachPoint from "../AttachPoint";
import { CarContext } from "../car";
import useCarStore from "../engine/carStore";
import useItemStore, { Item } from "../engine/itemStore";
import RotatePoint from "../RotatePoint";
import styles from "@/css/Game.module.css";
import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
export const jerrymax = 10000; //in milliliters
export default function JerryCan({
  id,
  attachedTo,
  angle = 0,
  fullness = 0,
}: Item) {
  const tag = `jerrycan${id}`;
  const update = useItemStore().update;
  const addFuel = useCarStore().addFuel;
  const car = useContext(CarContext);

  function fill() {
    if (attachedTo == undefined || car == undefined || fullness <= 0) return;
    const diff =
      ((-angle - 45 - ((jerrymax - fullness) / jerrymax) * 90) / 90) *
      0.1 *
      fullness;
    if (diff > 0) update(id, { fullness: fullness - diff });
    addFuel(car.id, diff);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (angle < -45) {
      interval = setInterval(fill, 50);
      return () => clearInterval(interval);
    }
  }, [angle, fullness]);

  return (
    <RotatePoint
      range={{ min: -135, max: 0 }}
      className={`${styles.tool} ${styles.jerrycan}`}
      angle={angle!}
      attachedTo={attachedTo}
      tag={tag}
      transformOrigin="50% 10%"
    >
      <AttachPoint
        attachedTo={attachedTo}
        detachondrop={true}
        style={{ height: "10%", width: "50%", left: "25%", top: "5%" }}
        target={"fuelhole"}
        offsetParent={{ x: 0.1, y: 0.1 }}
        tag={tag}
      />
      <img src={"/Avatar.png"} style={{ height: "100%", width: "100%" }} />
      <progress value={fullness} max={jerrymax} />
    </RotatePoint>
  );
}
