"use client";

import styles from "@/css/Game.module.css";

import { useItems } from "@/components/engine/itemStore";
import RenderItem from "@/components/engine/RenderItem";
import { ViewTag } from "../engine/ViewManager";
import Tap from "../carComponents/Tap";
import ItemRack from "../ItemRack";
import Weather from "../Weather";
import { LaptopButton } from "../laptop";

export default function Workbench() {
  const tag: ViewTag = "workbench";
  const items = useItems(tag);

  return (
    <div
      data-container={tag}
      style={{
        backgroundImage: "url(/backgrounds/desk.svg)",
        backgroundSize: "100%",
        position: "relative",
        height: "inherit",
        width: "inherit",
      }}
    >
      <Weather />
      <ItemRack
        type="wrench"
        capacity={1}
        sprite="/elements/items/bolt.png"
        style={{
          position: "absolute",
          width: "10cqw",
          right: "10cqw",
          top: "10cqw",
        }}
        height={5}
      />
      <Tap
        style={{
          height: "20cqw",
          aspectRatio: "1/1",
          left: "5cqw",
          top: "12cqw",
        }}
      />
      <LaptopButton />
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
