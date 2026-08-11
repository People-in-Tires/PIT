import styles from "../css/Index.module.css";
import React, { useState } from "react";
import { createContext } from "vm";
import { useContext } from "react";
import { InventoryContext, ViewContext } from "../page";
//use context containing  astate

export default function Inventory({
  slots = 10,
  size = 0.75,
}: {
  slots?: number;
  size?: number;
}) {
  const rows: React.JSX.Element[] = [];
  const inventory = useContext(InventoryContext);
  if (inventory === undefined || inventory.inventory === undefined) return;
  for (let i = 0; i < slots; i++) {
    rows.push(
      <InventorySlots
        xPer={(100 / slots) * (i + (1 - size) / 2)}
        size={(100 / slots) * size}
        content={React.createElement("div", inventory.inventory[i])}
        key={i}
      />,
    );
  }
  return <div id="inventory">{rows}</div>;
}

function InventorySlots({
  xPer,
  size,
  content,
}: {
  xPer: number;
  size: number;
  content: React.JSX.Element | null;
}) {
  return (
    <div
      className={styles.inventory}
      style={{
        left: `${xPer}%`,
        bottom: "5%",
        width: `${size}%`,
        aspectRatio: 1,
      }}
    ></div>
  );
}

export const InventoryFunctions = (function () {
  //get ref to slots for collision and add function for collision detection
  // const [inventory, setInventory] = useState<(HTMLElement | null)[]>([]);
  let inventory: (HTMLElement | null)[] = [];
  function init(slots: number) {
    let tmp: (HTMLElement | null)[] = [];
    for (let i = 0; i < slots; i++)
      //have slots be a macro
      tmp.push(null);
    inventory = tmp;
  }
  function addContent(content: HTMLElement, index: number) {
    const newContent = inventory.map((c, i) => {
      if (i === index) {
        return content;
      } else {
        return c;
      }
    });
    console.log(inventory);
    inventory = newContent;
  }
  return {
    addContent,
    init,
    inventory,
  };
})();
