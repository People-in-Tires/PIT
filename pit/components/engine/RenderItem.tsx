"use client";

import { Item } from "@/components/engine/itemStore";
import DraggableItem from "./DraggableItem";
import Beer from "../items/Beer";
import Grilllitter from "../items/GrillLitter";
import Garage from "../views/Garage";
import { SLOT_SIZE } from "@/shared/inventoryConfig";

const registry: Record<string, React.ComponentType<any>> = {
  beer: Beer,
  litter: Grilllitter,
};

export default function RenderItem({ item }: { item: Item }) {
  const Comp = registry[item.type];
  if (!Comp) return null;

  const inInventory = item.container === "inventory";
  const width = inInventory ? SLOT_SIZE : item.width;
  const height = inInventory ? SLOT_SIZE : item.height;

  // css inInventory
  return (
    <DraggableItem {...item}>
      <Comp {...item} width={width} height={height} /* classname item */ />
    </DraggableItem>
  );
}
