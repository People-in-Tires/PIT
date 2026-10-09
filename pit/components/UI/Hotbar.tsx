"use client";

import React, { useContext } from "react";
import Inventory from "./Inventory";
import RaceButtons from "./RaceButtons";
import Bin from "./Bin";
import styles from "@/css/Game.module.css";

export default function Hotbar() {
  return (
    <div className={styles.hotbar}>
      <RaceButtons width={10} />
      <Inventory width={90} />
    </div>
  );
}
