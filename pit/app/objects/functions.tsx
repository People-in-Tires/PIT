import { DraggableData, ControlPosition } from "react-draggable";
import styles from "../Index.module.css";
import React, { JSX, useState } from "react";
import { InventoryFunctions } from "./inventory";
import { useContext } from "react";
import { InventoryContext } from "../page";

export function overlap(elem1: DOMRect, elem2: DOMRect): boolean {
  return !(
    elem1.right < elem2.left ||
    elem1.left > elem2.right ||
    elem1.bottom < elem2.top ||
    elem1.top > elem2.bottom
  );
}

export function addInv(data: DraggableData) {
  const inventory = useContext(InventoryContext);
  if (inventory === undefined || inventory.inventory === undefined) return;
  const tmp = document.getElementById("inventory"); //replace with
  if (!tmp) return;
  const children = tmp.children;
  for (let i = 0; i < children.length; i++) {
    if (
      overlap(
        data.node.getBoundingClientRect(),
        children[i].getBoundingClientRect(),
      ) &&
      children[i].getElementsByClassName(`${styles.item}`).length == 0
    ) {
      const newContent = inventory.inventory.map((c, index) => {
        if (index === i) {
          return data.node;
        } else {
          return c;
        }
      });
      inventory.setInventory(newContent);
    }
  }
}
