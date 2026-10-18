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

interface IGame {
  img: string;
  base_index: number;
  type: React.ComponentType<IGameInstance>;
  count: number;
}

export interface IGameInstance {
  container: string;
  slot: number;
  index: number;
}

export const minigame_registry: Record<string, IGame> = {
  grill: { img: "/grill.png", type: GrillGame, count: 1, base_index: 0 },
  wing: { img: "/backflap.svg", type: WingGame, count: 1, base_index: 1 },
  fuel: { img: "/globe.svg", type: FuelGame, count: 1, base_index: 2 },
  wheel: { img: "/wheelnormal.svg", type: WheelGame, count: 4, base_index: 3 },
};

function GameWindow({
  closeWindow,
  name,
  slot,
  index,
  children,
}: {
  index: number;
  slot: number;
  closeWindow: (value: boolean) => void;
  name: string;
} & React.PropsWithChildren) {
  const ref = createRef<HTMLDivElement>();
  const tag = useCarStore().tag;
  const items = useItems(tag!);

  return (
    <Draggable
      handle={`#windowhandle`}
      nodeRef={ref}
      positionOffset={{
        x: `${index % 2 == 0 ? -25 : 125}%`,
        y: `${index < 2 ? -25 : 125}%`,
      }}
    >
      <div ref={ref} className={`${styles.GameFrame}`}>
        <header id={`windowhandle`} className={`${styles.GameFrameHeader}`}>
          {`${name} minigame`}
          <button onClick={() => closeWindow(false)}>
            <Image width={20} height={20} src={"/window.svg"} alt={"close"} />
          </button>
        </header>
        <div
          data-container={tag}
          data-slot={slot}
          className={`${styles.GameWindow}`}
        >
          {items
            .filter((item) => item.invSlot === slot)
            .map((item) => (
              <RenderItem key={item.id} item={item} />
            ))}
          {children}
        </div>
      </div>
    </Draggable>
  );
}

function createGame(
  setOpen: (input: boolean) => void,
  index: number,
  name: string,
  gametemplate: IGame,
): React.JSX.Element {
  return (
    <GameWindow
      closeWindow={setOpen}
      name={name}
      key={name}
      slot={gametemplate.base_index + index}
      index={index}
    >
      <gametemplate.type
        index={index}
        slot={gametemplate.base_index + index}
        container={`GameWindow_${name}`}
      />
    </GameWindow>
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
        ),
      );
    return tmpwindows;
  });

  return (
    <React.Fragment>
      <button
        style={{ left: `${x}%`, top: `${y}%` }}
        className={`${styles.GameButton}`}
        disabled={[...open].every((v) => v === true)}
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
