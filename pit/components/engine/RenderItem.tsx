"use client";

import { Item } from "@/components/engine/itemStore";
import DraggableItem from "./DraggableItem";
import Beer from "../items/Beer";
import Grilllitter from "../items/GrillLitter";
import Wrench from "../tools/wrench";
import NormalWheel from "../items/NormalWheel";
import JerryCan from "../tools/JerryCan";
import ItemInfo from "../UI/ItemInfo";
import { useState } from "react";

export type ItemType =
  "beer" | "litter" | "wrench" | "normalwheel" | "jerrycan";

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
  const [mouse, setMouse] = useState<boolean>(false);
  if (!Component) return null;
  // css inInventory
  return (
    <DraggableItem {...item} setMouse={setMouse}>
      <Component {...item} /* classname item */ />
      {mouse && item.fullness && <ItemInfo {...item} />}
    </DraggableItem>
  );
}
