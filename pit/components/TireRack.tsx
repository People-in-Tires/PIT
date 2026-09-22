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
	function ItemInRack({ id }: ContainerStopHandler): action {
		if (items.length >= capacity) return action.done; //not just snap back to pickup
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
      className={styles.tirerack}
    >
      <img src={sprite} style={{ height: "100%", width: "100%" }} />
      {items.length > 0 && <RenderItem item={items[0]} />}
    </div>
  );
}
