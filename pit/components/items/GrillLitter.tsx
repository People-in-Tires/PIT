"use client";
import styles from "@/css/Game.module.css";
import useItemStore, { Item } from "../engine/itemStore";
import useCarStore from "../engine/carStore";
import { minigame_registry } from "../UI/GameButton";

interface ILitter {
  spriteDefault: string;
  spriteGrabbed?: string;
  size: number;
}

export function createLitter() {
  const register: ILitter[] = [
    { spriteDefault: "trash_mosquito.png", size: 4 },
    { spriteDefault: "trash_bee.png", size: 4 },
    { spriteDefault: "trash_chips.png", size: 6 },
    { spriteDefault: "leaves_1.png", spriteGrabbed: "leaves_2.png", size: 8 },
  ];
  const carstore = useCarStore.getState();
  const add = useItemStore.getState().add;
  const sprite_seed = Math.floor(Math.random() * register.length);
  add({
    type: "litter",
    container: carstore.tag,
    invSlot: minigame_registry["grill"].base_index,
    x: (Math.random() * 0.6 + 0.2) * window.outerHeight * 0.4,
    y: (Math.random() * 0.5 + 0.5) * window.outerHeight * 0.2,
    angle: Math.random() * 360,
    height: register[sprite_seed].size,
    width: register[sprite_seed].size,
    spriteDefault: register[sprite_seed].spriteDefault,
    spritesGrabbed: register[sprite_seed].spriteGrabbed,
  });
}

export default function Grilllitter({
  spriteDefault,
  spritesGrabbed,
  angle,
  pickedup,
}: Item) {
  return (
    <div
      style={{
        rotate: `${angle}deg`,
        height: "100%",
        width: "100%",
      }}
    >
      <img
        draggable="false"
        src={`/elements/trash/${spritesGrabbed && pickedup ? spritesGrabbed : spriteDefault}`}
        alt="litter"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
