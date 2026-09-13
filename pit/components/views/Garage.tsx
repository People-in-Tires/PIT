"use client";

import styles from "@/css/Game.module.css";

import useItemStore, { useItems } from "@/components/engine/itemStore";
import RenderItem from "@/components/engine/RenderItem";
import Car from "@/components/car";
import { BeerButton } from "../items/BeerButton";
import Image from "next/image";
import { useEffect } from "react";
import { ViewTag } from "../engine/ViewManager";

export default function Garage() {
  const tag: ViewTag = "garage";
  const items = useItems(tag);
  const add = useItemStore().add;
  useEffect(() => {
    add({
      type: "wrench",
      container: tag,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      handle: "#handle",
    });
  }, [add]);
  useEffect(() => {
    add({
      type: "normalwheel",
      container: tag,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
    });
  }, [add]);
  return (
    <div data-container={tag} className={styles.gameview}>
      <Image
        src={"/background-brick-1.jpg"}
        width={1920}
        height={1080}
        alt="background"
        className={styles.background}
      />
      <BeerButton container={tag} />
      <Car id={0} />
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
