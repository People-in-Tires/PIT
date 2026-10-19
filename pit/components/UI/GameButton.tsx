import Image from "next/image";
import styles from "@/css/Game.module.css";
import { createRef, useState } from "react";
import Draggable from "react-draggable";
import React from "react";
import { useItems } from "../engine/itemStore";
import RenderItem from "../engine/RenderItem";
import GrillGame from "../carComponents/GrillGame";
import WingGame from "../carComponents/WingGame";
import WheelGame from "../carComponents/WheelGame";
import FuelGame from "../carComponents/FuelGame";
import useCarStore from "../engine/carStore";
import PressButton from "./PressButton";
import DraggableWindow from "./DraggableWindow";
import { toGlobalCoords } from "../engine/itemHandlerHelpers";

interface IGame {
  img: string;
  base_index: number;
  type: React.ComponentType<IGameInstance>;
  count: number;
  height: number;
  width: number;
}

export interface IGameInstance {
  container: string;
  slot: number;
  index: number;
}

export const minigame_registry: Record<string, IGame> = {
  grill: {
    img: "/grill.png",
    type: GrillGame,
    count: 1,
    base_index: 0,
    height: 20,
    width: 30,
  },
  wing: {
    img: "/backflap.svg",
    type: WingGame,
    count: 1,
    base_index: 1,
    height: 20,
    width: 30,
  },
  fuel: {
    img: "/globe.svg",
    type: FuelGame,
    count: 1,
    base_index: 2,
    height: 30,
    width: 30,
  },
  wheel: {
    img: "/wheelnormal.svg",
    type: WheelGame,
    count: 4,
    base_index: 3,
    height: 20,
    width: 30,
  },
};

function createGame(
  setOpen: (input: boolean) => void,
  index: number,
  name: string,
  gametemplate: IGame,
  x: number,
  y: number,
): React.JSX.Element {
  return (
    <DraggableWindow
      closeWindow={setOpen}
      name={name}
      key={name}
      height={gametemplate.height}
      width={gametemplate.width}
      slot={gametemplate.base_index + index}
      initialPosition={{ x: -x + 100 * index, y: -y + 100 * index }}
    >
      <gametemplate.type
        index={index}
        slot={gametemplate.base_index + index}
        container={`GameWindow_${name}`}
      />
    </DraggableWindow>
  );
}

export default function GameButton({
  x,
  y,
  name,
}: {
  name: string;
  x: number;
  y: number;
}) {
  const gametemplate = minigame_registry[name];
  const [open, setOpen] = useState<boolean[]>(
    Array<boolean>(gametemplate.count).map(() => false),
  );
  const car = useCarStore().in_stop;
  const [windows, setWindows] = useState(() => {
    const tmpwindows: React.JSX.Element[] = [];
    for (let i = 0; i < gametemplate.count; i++)
      tmpwindows.push(
        createGame(
          (input: boolean) => {
            setOpen((prevOpen) =>
              prevOpen.map((_, index) => (index == i ? input : _)),
            );
          },
          i,
          gametemplate.count > 1 ? `${name} ${i}` : `${name}`,
          gametemplate,
          x,
          y,
        ),
      );
    return tmpwindows;
  });

  return (
    <React.Fragment>
      <button
        style={{ left: `${x}%`, top: `${y}%` }}
        className={`${styles.GameButton}`}
        disabled={[...open].every((v) => v === true) || car == undefined}
        onClick={() => {
          setOpen((prevOpen: boolean[]) => [...prevOpen].map(() => true));
        }}
        id={`${name} button`}
      >
        <Image
          width={400}
          height={300}
          src={gametemplate.img}
          alt={`${name} button image`}
          draggable="false"
        />
      </button>
      {[...windows].filter((_, index) => [...open][index])}
    </React.Fragment>
  );
}
