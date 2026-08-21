import { MiniGameProps } from "@/app/objects/GameButton";
import React, { createContext, useEffect } from "react";
import { StateContext } from "@/app/page";
import styles from "../../Index.module.css";
import Wrench from "@/app/objects/wrench";
import WheelGnome from "./WheelGnome";
import WheelSmooth from "./WheelSmooth";
import WheelFlintstone from "./WheelFlintstone";
import WheelSki from "./WheelSki";
import { ItemProps } from "@/app/objects/item";

export const WheelContext = createContext<StateContext | undefined>(undefined);

export function Bolt({ x, y }: {} & ItemProps) {
  return (
    <img
      src={
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Usain_Bolt_Olympics_Celebration.jpg/960px-Usain_Bolt_Olympics_Celebration.jpg"
      }
      height={50}
      width={50}
      style={{ top: `${x}%`, left: `${y}%` }}
      className={`${styles.beer}`}
    ></img>
  );
}

export default function WheelGame({ metadata, setOutput }: {} & MiniGameProps) {
  const wheeltypes: { [key: string]: React.JSX.Element } = {
    gnome: <WheelGnome />,
    smooth: <WheelSmooth />,
    flintstone: <WheelFlintstone />,
    ski: <WheelSki />,
  };

  return (
    <>
      <WheelContext value={undefined}>
        {wheeltypes[metadata["wheel"]]}
      </WheelContext>
    </>
  );
}
