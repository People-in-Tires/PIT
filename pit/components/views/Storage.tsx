"use client";

import styles from "@/css/Game.module.css";
import { useItems } from "@/components/engine/itemStore";
import RenderItem from "@/components/engine/RenderItem";
import { ViewTag } from "../engine/ViewManager";
import ItemRack from "../ItemRack";

export default function Storage() {
  const tag: ViewTag = "storage";
  const items = useItems(tag);

  return (
    <div data-container={tag} className={styles.gameview}>
      <ItemRack
        type="normalwheel"
        capacity={6}
        sprite="/wheelrackbottom.png"
        style={{
          position: "absolute",
          height: "10vw",
          width: "10vw",
          left: "10vw",
          top: "30vw",
        }}
      />
      <ItemRack
        type="hardwheel"
        capacity={6}
        sprite="/wheelracktop.png"
        style={{
          position: "absolute",
          height: "10vw",
          width: "10vw",
          left: "20vw",
          top: "30vw",
        }}
      />
      <ItemRack
        type="wetwheel"
        capacity={6}
        sprite="/wheelrackbottom.png"
        style={{
          position: "absolute",
          height: "10vw",
          width: "20vw",
          left: "10vw",
          top: "20vw",
        }}
      />
      <ItemRack
        type="softwheel"
        capacity={6}
        sprite="/wheelrackgnome.png"
        style={{
          position: "absolute",
          height: "10vw",
          width: "10vw",
          left: "40vw",
          top: "30vw",
        }}
      />
      <ItemRack
        type="jerrycan"
        capacity={2}
        sprite="/jerryrack.png"
        style={{
          position: "absolute",
          height: "10vw",
          width: "10vw",
          left: "50vw",
          top: "30vw",
        }}
      />
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
