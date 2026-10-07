import useItemStore, { useItems, useItemsState } from "./engine/itemStore";
import { ItemType } from "./engine/RenderItem";
import RenderItem from "./engine/RenderItem";
import styles from "@/css/Game.module.css";
import { CSSProperties, useEffect, useState } from "react";
import {
  ContainerStopHandler,
  action,
  registerStopHandler,
  unregisterStopHandler,
} from "./engine/itemHandlerRegistry";

//fill with tires etc
export default function ItemRack({
  type,
  capacity,
  sprite,
  style,
}: {
  type: ItemType;
  capacity: number;
  sprite: string;
  style: CSSProperties;
}) {
  const tag = `${type}rack`;
  const move = useItemStore.getState().move;
  const items = useItems(tag);

  useEffect(() => {
    const create = useItemStore.getState().create;
    for (let i = 0; i < capacity; i++) create({type: type, container: tag});
  }, []);

  useEffect(() => {
    function ItemInRack({ id }: ContainerStopHandler): action {
      if (items.length >= capacity || useItemStore.getState().items[id].type !== type) return action.done;
      move(id, { container: tag, x: 0, y: 0 });
      return action.done;
    }

    registerStopHandler<ContainerStopHandler>(tag, ItemInRack);
    return () => unregisterStopHandler(tag);
  }, [capacity, [...items]]);

  return (
    <div
      data-container={tag}
      style={{ ...style, position: "absolute" }}
      className={styles.storage}
    >
      <img
        src={sprite}
        style={{ position: "absolute", height: "100%", width: "100%" }}
      />
      {items.length > 0 && <RenderItem item={items[0]} />}
    </div>
  );
}
