import useItemStore, { useItems } from "./engine/itemStore";
import { ItemType } from "./engine/RenderItem";
import RenderItem from "./engine/RenderItem";
import styles from "@/css/Game.module.css";
import { CSSProperties, useEffect } from "react";
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
  height,
}: {
  type: ItemType;
  capacity: number;
  sprite: string;
  style: CSSProperties;
  height: number;
}) {
  const tag = `${type}rack`;
  const move = useItemStore.getState().move;
  const items = useItems(tag);

  useEffect(() => {
    const create = useItemStore.getState().create;
    for (
      let i = items.filter((value) => value.type == type).length;
      i < capacity;
      i++
    )
      create({ type: type, container: tag });
  }, [capacity, tag, type]);

  useEffect(() => {
    function ItemInRack({ id }: ContainerStopHandler): action {
      if (
        items.length >= capacity ||
        useItemStore.getState().items[id].type !== type
      )
        return action.done;
      move(id, { container: tag, x: 0, y: 0, attachedTo: undefined });
      return action.done;
    }

    registerStopHandler<ContainerStopHandler>(tag, ItemInRack);
    return () => unregisterStopHandler(tag);
  }, [capacity, items.length, move, tag, type]);

  return (
    <div
      data-container={tag}
      style={{
        ...style,
        position: "absolute",
        height: `${height}cqw`,
        aspectRatio: "1/1",
        borderWidth: "0.5cqw",
        borderColor: "grey",
      }}
    >
      {items.length > 0 && (
        <RenderItem
          item={{ ...items[0], disable_detail: true, height: height }}
        />
      )}
    </div>
  );
}
