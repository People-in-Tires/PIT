"use client";

import React, { useContext } from "react";
import Inventory from "./Inventory";
import RaceButtons from "./RaceButtons";
import Bin from "./Bin";
import styles from "@/css/Game.module.css";

export default function Hotbar() {
  return (
    <div
      style={{
        zIndex: "2",
        position: "fixed",
        bottom: "5%",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignContent: "center",
        gap: 25,
      }}
    >
      <RaceButtons width={10} />
      <Inventory width={90} />
    </div>
  );
}
