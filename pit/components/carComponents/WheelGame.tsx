import { IGameInstance } from "../UI/GameButton";
import style from "@/css/Game.module.css";
import { createRef, useEffect, useContext } from "react";
import useCarStore from "../engine/carStore";
import useItemStore from "../engine/itemStore";
import { getStopHandler } from "../engine/itemHandlerRegistry";

export default function WheelGame({ index, slot }: IGameInstance) {
  const spokeref = createRef<HTMLDivElement>();
  const container = useCarStore().tag;
  const items = useItemStore().items.filter(
    (value) => value.container === container && value.invSlot === slot,
  );
  useEffect(() => {
    const wheel = items.filter(
      (value) => value.attachedTo === true && value.type.includes("wheel"),
    )[0];
    if (wheel) {
      const handler = getStopHandler(wheel.type + wheel.id);
      if (handler) handler({ id: wheel.id });
    }
  }, []);
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
