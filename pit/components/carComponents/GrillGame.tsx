"use client";
import React, { createContext, useEffect } from "react";
import Grilllitter from "../items/GrillLitter";
import { useState } from "react";
import { MiniGameProps } from "@/components/UI/GameButton";
import Item, { useItems, useItemsState } from "../engine/itemStore";
import useItemStore from "../engine/itemStore";
import RenderItem from "../engine/RenderItem";

export const GrillContext = createContext<
  | {
      state: React.JSX.Element[];
      setState: React.Dispatch<React.SetStateAction<React.JSX.Element[]>>;
    }
  | undefined
>(undefined);
export default function GrillGame({ metadata, setOutput }: {} & MiniGameProps) {
  const sprites: string[] = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Copper_Beech_Fagus_sylvatica_f._purpurea_Autumn_Leaves_Closeup_3008px.jpg/960px-Copper_Beech_Fagus_sylvatica_f._purpurea_Autumn_Leaves_Closeup_3008px.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Luchsfliege_Thereva_sp_02_%28MK%29.jpg/960px-Luchsfliege_Thereva_sp_02_%28MK%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Trash_on_Queens_Day.jpg/960px-Trash_on_Queens_Day.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
  ];
  const add = useItemStore().add;
  const items = useItems("GameWindow_grill");
  useEffect(() => {
    const grillItems = useItemsState("GameWindow_grill");
    for (let i = grillItems.length; i < (metadata["litter"] as number); i++) {
      add({
        type: "litter",
        container: "GameWindow_grill",
        x: (Math.random() * 0.8 + 0.1) * window.outerHeight * 0.4,
        y: (Math.random() * 0.8 + 0.1) * window.outerHeight * 0.2,
        width: 3,
        height: 3,
        sprite: sprites[i % 3],
      });
      console.log("added guy");
    }
  }, []);

  useEffect(() => {
    const grillItems = useItemsState("GameWindow_grill");

    setOutput(grillItems.length);
  }, [items]);

  return (
    <div
      data-container="GameWindow_grill"
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
