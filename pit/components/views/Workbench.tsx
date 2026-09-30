"use client";

import styles from "@/css/Game.module.css";

import { useItems } from "@/components/engine/itemStore";
import RenderItem from "@/components/engine/RenderItem";
import { BeerButton } from "../items/BeerButton";
import Image from "next/image";
import { WheelButton } from "../items/WheelButton";
import { ViewTag } from "../engine/ViewManager";
import MiniMapCar from "../MiniMapCar";
import Tap from "../carComponents/Tap";
import AttachPoint from "../AttachPoint";
import ItemRack from "../ItemRack";

export default function Workbench() {
  const tag: ViewTag = "workbench";
  const items = useItems(tag);

  return (
    <div data-container={tag} className={styles.gameview}>
      <Image
        src={"/desk.svg"}
        width={`100`}
        height={`1080`}
        alt="background"
        className={styles.background}
      />
      <ItemRack
        type="wrench"
        capacity={1}
        sprite="/bolt.png"
        style={{
          position: "absolute",
          height: "5vw",
          width: "10vw",
          right: "10vw",
          top: "10vw",
        }}
      />
      <WheelButton container={tag} type="normalwheel" />
      <BeerButton container={tag} />
      <Tap
        style={{
          height: "20vw",
          aspectRatio: "1/1",
          left: "5vw",
          top: "12vw",
        }}
      />
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
