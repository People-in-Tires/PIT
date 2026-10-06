"use client";
import { useContext, useEffect } from "react";
import { useItems } from "../engine/itemStore";
import useItemStore from "../engine/itemStore";
import useCarStore, { useCar } from "../engine/carStore";
import { CarContext } from "../car";
import { IGameInstance } from "../UI/GameButton";

export default function GrillGame({ index, slot }: IGameInstance) {
  const sprites: string[][] = [
    ["/trash_mosquito.png", "/trash_mosquito2.png"],
    ["/trash_bee.png", "/trash_bee2.png"],
    ["/trash_chips.png", "/trash_chips2.png"],
    ["/leaves_1.png", "/leaves_2.png"],
  ];
  const add = useItemStore().add;
  const car = useCarStore().in_stop;
  const container = useCarStore().tag;
  const items = useItemStore().items.filter(
    (value) => value.container === container && value.invSlot === index + 3,
  );

  useEffect(() => {
    if (!car) return;
    for (let i = items.length; i < car.litter; i++) {
      add({
        type: "litter",
        container: container,
        invSlot: slot,
        x: (Math.random() * 0.8 + 0.1) * window.outerHeight * 0.4,
        y: (Math.random() * 0.8 + 0.1) * window.outerHeight * 0.2,
        angle: Math.random() * 360,
        width: i % 4 > 1 ? 4 : 2,
        height: i % 4 > 1 ? 4 : 2,
        sprites: sprites[i % 4],
      });
    }
  }, []);

  useEffect(() => {
    if (!car) return;
    useCarStore.getState().setLitter(items.length);
  }, [...items]);

  return (
    <div
      id="Grill"
      style={{
        position: "absolute",
        width: "80%",
        height: "80%",
        left: "10%",
        top: "10%",
        backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/CarGrill_0712_9128_%288314048101%29.jpg/960px-CarGrill_0712_9128_%288314048101%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail")`,
        backgroundSize: `contain`,
        backgroundRepeat: `no-repeat`,
      }}
    >
      {items.length}
    </div>
  );
}
