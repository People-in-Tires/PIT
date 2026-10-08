"use client";
import styles from "@/css/Game.module.css";
import useItemStore, { Item } from "../engine/itemStore";
import useCarStore from "../engine/carStore";
import { minigame_registry } from "../UI/GameButton";

export function createLitter() {
  const sprites: string[][] = [
    ["trash_mosquito.png", "trash_mosquito2.png"],
    ["trash_bee.png", "trash_bee2.png"],
    ["trash_chips.png", "trash_chips2.png"],
    ["leaves_1.png", "leaves_2.png"],
  ];
  const carstore = useCarStore.getState();
  const add = useItemStore.getState().add;
  const sprite_seed = Math.round(Math.random() * sprites.length);
  add({
    type: "litter",
    container: carstore.tag,
    invSlot: minigame_registry["grill"].base_index,
    x: (Math.random() * 0.8 + 0.1) * window.outerHeight * 0.4,
    y: (Math.random() * 0.8 + 0.1) * window.outerHeight * 0.2,
    angle: Math.random() * 360,
    width: sprite_seed % 4 > 1 ? 4 : 2,
    height: sprite_seed % 4 > 1 ? 4 : 2,
    sprites: sprites[sprite_seed % 4].map(
      (value) => `/elements/trash/${value}`,
    ),
  });
}

export default function Grilllitter({
  sprites,
  width,
  height,
  angle,
  pickedup,
}: Item) {
  return (
    <div
      className={`${styles.litter}`}
      style={{
        width: `${width}vw`,
        height: `${height}vw`,
        rotate: `${angle}deg`,
      }}
    >
      <img
        draggable="false"
        src={pickedup ? sprites![1] : sprites![0]}
        alt="litter"
      />
    </div>
  );
}
