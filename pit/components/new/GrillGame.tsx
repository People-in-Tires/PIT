"use client";
import React, { useEffect } from "react";
import useItemStore, { useItems, useItemsState } from "../engine/itemStore";
import RenderItem from "../engine/RenderItem";
import useCarStore from "../engine/carStore";

export default function GrillGame({ carId }: { carId: number }) {
  const sprites: string[] = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Copper_Beech_Fagus_sylvatica_f._purpurea_Autumn_Leaves_Closeup_3008px.jpg/960px-Copper_Beech_Fagus_sylvatica_f._purpurea_Autumn_Leaves_Closeup_3008px.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Luchsfliege_Thereva_sp_02_%28MK%29.jpg/960px-Luchsfliege_Thereva_sp_02_%28MK%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Trash_on_Queens_Day.jpg/960px-Trash_on_Queens_Day.jpg",
  ];

  const tag = `GameWindow_grill_car${carId}`;

  const add = useItemStore((state) => state.add);
  const items = useItems(tag);
  const car = useCarStore((state) => state.cars.find((c) => c.id === carId));
  const setLitter = useCarStore((state) => state.setLitter);

  useEffect(() => {
    const grillItems = useItemsState(tag);
    GrillGame;
    const targetLitter = car?.litter ?? 0;
    for (let i = grillItems.length; i < targetLitter; i++) {
      add({
        type: "litter",
        container: tag,
        x: (Math.random() * 0.8 + 0.1) * window.outerHeight * 0.4,
        y: (Math.random() * 0.8 + 0.1) * window.outerHeight * 0.2,
        width: 3,
        height: 3,
        sprite: sprites[i % 3],
      });
    }
  }, []);

  useEffect(() => {
    const grillItems = useItemsState(tag);
    setLitter(carId, grillItems.length);
  }, [items, carId, setLitter]);

  return (
    <div
      data-container={tag}
      id={`Grill-${carId}`}
      style={{
        position: "absolute",
        width: "80%",
        height: "80%",
        left: "10%",
        top: "10%",
        backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/CarGrill_0712_9128_%288314048101%29.jpg/960px-CarGrill_0712_9128_%288314048101%29.jpg")`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      {useItemsState(tag).length}
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
