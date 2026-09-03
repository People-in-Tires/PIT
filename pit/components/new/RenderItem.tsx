"use client";

import { Item } from "@/components/new/itemStore";
import DraggableItem from "./DraggableItem";
import Beer from "./Beer";
import Garage from "../scenes/Garage";
import { SLOT_SIZE } from "@/shared/inventoryConfig";

const registry: Record<string, React.ComponentType<any>> = {
  beer: Beer,
  garage: Garage,
};

export default function RenderItem({ item }: { item: Item }) {
  const Comp = registry[item.type];
  if (!Comp) return null;

  const inInventory = item.container === "inventory";
  const width = inInventory ? SLOT_SIZE : item.width;
  const height = inInventory ? SLOT_SIZE : item.height;

  return (
    <DraggableItem id={item.id} x={item.x} y={item.y}>
      <Comp {...item} width={width} height={height} />
    </DraggableItem>
  );
}