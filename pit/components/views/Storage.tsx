"use client";

import styles from "@/css/Game.module.css";
import { useItems } from "@/components/engine/itemStore";
import RenderItem from "@/components/engine/RenderItem";
import { ViewTag } from "../engine/ViewManager";
import ItemRack from "../ItemRack";
import Bin from "../UI/Bin";

export default function Storage() {
  const tag: ViewTag = "storage";
  const items = useItems(tag);

  return (
    <div
      data-container={tag}
      style={{
        backgroundImage: `url(/backgrounds/storage.svg)`,
        backgroundSize: "100%",
        position: "relative",
        height: "inherit",
        width: "inherit",
      }}
    >
      <ItemRack
        type="normalwheel"
        capacity={6}
        sprite="/elements/storage/wheelrackbottom.png"
        style={{
          position: "absolute",
          width: "10cqw",
          left: "10cqw",
          top: "30cqw",
        }}
        height={10}
      />
      <ItemRack
        type="hardwheel"
        capacity={6}
        sprite="/elements/storage/wheelracktop.png"
        style={{
          position: "absolute",
          width: "10cqw",
          left: "20cqw",
          top: "30cqw",
        }}
        height={10}
      />
      <ItemRack
        type="wetwheel"
        capacity={6}
        sprite="/elements/storage/wheelrackbottom.png"
        style={{
          position: "absolute",
          width: "20cqw",
          left: "10cqw",
          top: "20cqw",
        }}
        height={10}
      />
      <ItemRack
        type="softwheel"
        capacity={6}
        sprite="/elements/storage/wheelrackgnome.png"
        style={{
          position: "absolute",
          width: "10cqw",
          left: "40cqw",
          top: "30cqw",
        }}
        height={10}
      />
      <ItemRack
        type="jerrycan"
        capacity={2}
        sprite="/elements/storage/jerryrack.png"
        style={{
          position: "absolute",
          width: "10cqw",
          left: "50cqw",
          top: "30cqw",
        }}
        height={10}
      />
      <Bin style={{ right: "5cqw", bottom: "20cqh" }} />
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
