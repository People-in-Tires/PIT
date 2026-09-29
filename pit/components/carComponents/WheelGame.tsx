import { IGameInstance } from "../UI/GameButton";
import style from "@/css/Game.module.css";
import { createRef, useRef, useState, useEffect, useContext } from "react";
import useCarStore from "../engine/carStore";
import useItemStore from "../engine/itemStore";
import { CarContext } from "../car";

export default function WheelGame({ index }: IGameInstance) {
  const spokeref = createRef<HTMLDivElement>();
  const setWheel = useCarStore().setWheel;
  const car = useContext(CarContext);

  useEffect(() => {
    function receiveattach(e: Event) {
      if (car) setWheel(car.id, index, (e as CustomEvent).detail.attachedID);
    }

    spokeref.current?.addEventListener("attach", receiveattach);
    return () => {
      spokeref.current?.removeEventListener("attach", receiveattach);
    };
  }, [car, spokeref, index]);

  if (!car) return null;
  return (
    <div>
      <div
        ref={spokeref}
        className={`${style.hitbox} spoke`}
        style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
      ></div>
    </div>
  );
}
