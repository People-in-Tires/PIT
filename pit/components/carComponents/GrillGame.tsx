"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useItems, useItemsState } from "../engine/itemStore";
import useItemStore from "../engine/itemStore";
import RenderItem from "../engine/RenderItem";
import useCarStore from "../engine/carStore";
import { CarContext } from "../car";
import { IGameInstance } from "../UI/GameButton";

export const GrillContext = createContext<
  | {
      state: React.JSX.Element[];
      setState: React.Dispatch<React.SetStateAction<React.JSX.Element[]>>;
    }
  | undefined
>(undefined);
export default function GrillGame({ container }: IGameInstance) {
  const sprites: string[] = [
    "/trash_mosquito.png",
    "/trash_chips.png",
    "/trash_bee.png",
  ];
  const add = useItemStore().add;
  const setOutput = useCarStore().setLitter;
  const items = useItems(container);
  const car = useContext(CarContext);

  useEffect(() => {
    if (!car) return;
    for (let i = items.length; i < car.litter; i++) {
      add({
        type: "litter",
        container: container,
        x: (Math.random() * 0.8 + 0.1) * window.outerHeight * 0.4,
        y: (Math.random() * 0.8 + 0.1) * window.outerHeight * 0.2,
        angle: Math.random() * 360,
        width: i % 3 == 1 ? 6 : 3,
        height: i % 3 == 1 ? 6 : 3,
        sprite: sprites[i % 3],
      });
    }
  }, []);

  useEffect(() => {
    if (!car) return;
    setOutput(car.id, items.length);
  }, [items]);
  if (!car) return null;

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
