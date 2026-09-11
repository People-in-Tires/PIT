"use client";

import { Item } from "@/components/engine/itemStore";
import DraggableItem from "./DraggableItem";
import Beer from "../items/Beer";
import Grilllitter from "../items/GrillLitter";
import Wrench from "../tools/wrench";
import NormalWheel from "../items/NormalWheel";

const registry: Record<string, React.ComponentType<any>> = {
  beer: Beer,
  litter: Grilllitter,
  wrench: Wrench,
  normalwheel: NormalWheel,
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
