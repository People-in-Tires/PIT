"use client";

import { Item } from "@/components/engine/itemStore";
import DraggableItem from "./DraggableItem";
import Beer from "../items/Beer";
import Grilllitter from "../items/GrillLitter";
import Wrench from "../tools/wrench";
import NormalWheel from "../items/NormalWheel";
import JerryCan from "../tools/JerryCan";

const registry: Record<string, React.ComponentType<Item>> = {
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
  const Comp = registry[item.type];
  if (!Comp) return null;

  // css inInventory
  return (
    <DraggableItem {...item}>
      <Comp {...item} /* classname item */ />
    </DraggableItem>
  );
}
