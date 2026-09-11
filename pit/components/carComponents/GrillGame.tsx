"use client";
import React, { createContext, useContext, useEffect } from "react";
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
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Copper_Beech_Fagus_sylvatica_f._purpurea_Autumn_Leaves_Closeup_3008px.jpg/960px-Copper_Beech_Fagus_sylvatica_f._purpurea_Autumn_Leaves_Closeup_3008px.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Luchsfliege_Thereva_sp_02_%28MK%29.jpg/960px-Luchsfliege_Thereva_sp_02_%28MK%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Trash_on_Queens_Day.jpg/960px-Trash_on_Queens_Day.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
  ];
  const add = useItemStore().add;
  const setOutput = useCarStore().setLitter;
  const items = useItems(container);
  const car = useContext(CarContext);

  useEffect(() => {
    const grillItems = useItemsState(container);
    if (!car) return;
    for (let i = grillItems.length; i < car.litter; i++) {
      add({
        type: "litter",
        container: container,
        x: (Math.random() * 0.8 + 0.1) * window.outerHeight * 0.4,
        y: (Math.random() * 0.8 + 0.1) * window.outerHeight * 0.2,
        width: 3,
        height: 3,
        sprite: sprites[i % 3],
      });
    }
  }, []);

  useEffect(() => {
    if (!car) return;
    const grillItems = useItemsState(container);
    setOutput(car.id, grillItems.length);
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
      {useItemsState("GameWindow_grill").length}
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
