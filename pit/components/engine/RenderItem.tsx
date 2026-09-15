"use client";

import { Item } from "@/components/engine/itemStore";
import DraggableItem from "./DraggableItem";
import Beer from "../items/Beer";
import Grilllitter from "../items/GrillLitter";
import Wrench from "../tools/wrench";
import NormalWheel from "../items/NormalWheel";
import JerryCan from "../tools/JerryCan";

export type ItemType = "beer" | "litter" | "wrench" | "normalwheel";

const registry: Record<ItemType, React.ComponentType<Item>> = {
  beer: Beer,
  litter: Grilllitter,
  wrench: Wrench,
  normalwheel: NormalWheel,
  // hardwheel: HardWheel,
  // wetwheel: WetWheel,
  // softwheel: SoftWheel,
  jerrycan: JerryCan,
};

export default function RenderItem({ item }: { item: Item }) {
  const Component = registry[item.type as ItemType];
  if (!Component) return null;

  // css inInventory
  return (
    <DraggableItem {...item}>
      <Component {...item} /* classname item */ />
    </DraggableItem>
  );
}
