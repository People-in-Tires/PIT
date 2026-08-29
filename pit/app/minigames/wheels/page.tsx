import { MiniGameProps } from "@/app/objects/GameButton";
import React, { createContext, createRef, useEffect, useState } from "react";
import { StateContext } from "@/app/page";
import styles from "../../Index.module.css";
import Wrench from "@/app/objects/wrench";
import WheelGnome from "./WheelGnome";
import WheelSmooth from "./WheelSmooth";
import WheelFlintstone from "./WheelFlintstone";
import WheelSki from "./WheelSki";

export const WheelContext = createContext<StateContext | undefined>(undefined);

export default function WheelGame({ metadata, setOutput }: {} & MiniGameProps) {
  //wheel context tracks bolts
  //have wheel function and pass as child the specifics
  return (
    <>
      <WheelContext value={undefined}>{metadata["wheel"]}</WheelContext>
    </>
  );
}
