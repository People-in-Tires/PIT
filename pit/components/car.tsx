"use client";

import { createContext, useContext } from "react";
import GameButton from "./UI/GameButton";
import styles from "@/css/Game.module.css";
import useCarStore, { ICar } from "./engine/carStore";
import { pullRaceState } from "@/lib/race/actions";
import { Race } from "@/lib/wasm/simulation";
import { useState } from "react";
import {
  registerStopHandler,
  unregisterStopHandler,
  ContainerStopHandler,
  action,
} from "./engine/itemHandlerRegistry";
import useItemStore from "./engine/itemStore";
import { useEffect } from "react";
import { toLocalCoords } from "./engine/itemHandlerHelpers";
import { SimulationContext } from "@/context/simulation";
import { LobbyContext } from "@/context/lobby";

export const CarContext = createContext<ICar | null>(null);

export default function Car() {
  const car = useCarStore().in_stop;
  const tag = useCarStore().tag;

  useEffect(() => {
    function putItemInCar({
      id,
      itemClientX,
      itemClientY,
    }: ContainerStopHandler): action {
      const stack = document.elementsFromPoint(itemClientX, itemClientY);
      const slotEl = stack.find(
        (el) => (el as HTMLElement).dataset?.slot !== undefined,
      ) as HTMLElement | undefined;
      if (!slotEl) return action.fallback;

      const slotIndex = Number(slotEl.dataset.slot);
      const { x: localX, y: localY } = toLocalCoords(
        slotEl,
        itemClientX,
        itemClientY,
      );
      useItemStore
        .getState()
        .move(id, { container: tag, x: localX, y: localY, invSlot: slotIndex });
      return action.done;
    }

    registerStopHandler<ContainerStopHandler>(tag, putItemInCar);
    return () => unregisterStopHandler(tag);
  }, [car]);

  if (car == undefined) return <></>;

  return (
    <div
      className={`${styles.car}`}
      style={{ top: "20vw", left: "20vw", width: "60vw", height: "30vw" }}
    >
      <GameButton x={35} y={50} name="grill" />
      <GameButton x={60} y={45} name="wing" />
      <GameButton x={80} y={50} name="wheel" />
      <GameButton x={50} y={20} name="fuel" />
      <img draggable={false} src={"/car2.png"} alt={"carbase"} />
    </div>
  );
}
