"use client";

import { createContext } from "react";
import GameButton from "./UI/GameButton";
import styles from "@/css/Game.module.css";
import useCarStore, { ICar } from "./engine/carStore";
import {
  registerStopHandler,
  unregisterStopHandler,
  ContainerStopHandler,
  action,
} from "./engine/itemHandlerRegistry";
import useItemStore from "./engine/itemStore";
import { useEffect } from "react";
import { toLocalCoords } from "./engine/itemHandlerHelpers";

export const CarContext = createContext<ICar | null>(null);

export default function Car({ id }: { id: number }) {
  const car = useCarStore().cars[id];

  function putItemInCar({
    id,
    itemClientX,
    itemClientY,
  }: ContainerStopHandler): action {
    const move = useItemStore.getState().move;
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
    move(id, { container: car.tag, x: localX, y: localY, invSlot: slotIndex });
    return action.done;
  }

  useEffect(() => {
    registerStopHandler<ContainerStopHandler>(car.tag, putItemInCar);
    return () => unregisterStopHandler(car.tag);
  }, []);

  return (
    <div
      className={`${styles.car}`}
      style={{ top: "20vw", left: "20vw", width: "60vw", height: "30vw" }}
    >
      <CarContext value={car}>
        <GameButton x={35} y={50} name="grill" />
        <GameButton x={60} y={45} name="wing" />
        <GameButton x={80} y={50} name="wheel" />
        <GameButton x={50} y={20} name="fuel" />
      </CarContext>
      <img draggable={false} src={"/car2.png"} alt={"carbase"} />
    </div>
  );
}
