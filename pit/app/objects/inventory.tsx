import styles from "../Index.module.css";
import React from "react";
//use context containing  astate

export default function Inventory({
  slots = 10,
  size = 0.75,
}: {
  slots?: number;
  size?: number;
}) {
  const rows: React.JSX.Element[] = [];
  for (let i = 0; i < slots; i++) {
    rows.push(
      <InventorySlots
        xPer={(100 / slots) * (i + (1 - size) / 2)}
        size={(100 / slots) * size}
        key={i}
      />,
    );
  }
  return <div id="inventory">{rows}</div>;
}

function InventorySlots({ xPer, size }: { xPer: number; size: number }) {
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
