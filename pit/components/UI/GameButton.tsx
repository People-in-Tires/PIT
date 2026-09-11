import Image from "next/image";
import styles from "@/css/Game.module.css";
import { createRef, useContext, useState } from "react";
import Draggable from "react-draggable";
import React from "react";
import { useItems } from "../engine/itemStore";
import RenderItem from "../engine/RenderItem";
import GrillGame from "../carComponents/GrillGame";
import WingGame from "../carComponents/WingGame";
import WheelGame from "../carComponents/WheelGame";
import { CarContext } from "../car";

interface IGame {
  img: string;
  type: React.ComponentType<IGameInstance>;
  count: number;
}

export interface IGameInstance {
  container: string;
  index: number;
}

const registry: Record<string, IGame> = {
  grill: { img: "/grill.png", type: GrillGame, count: 1 },
  wheel: { img: "/wheelnormal.svg", type: WheelGame, count: 4 },
  wing: { img: "/backflap.svg", type: WingGame, count: 1 },
};

function GameWindow({
  closeWindow,
  name,
  children,
}: {
  closeWindow: (value: boolean) => void;
  name: string;
} & React.PropsWithChildren) {
  const ref = createRef<HTMLDivElement>();
  const tag = `GameWindow_${name}`;
  const items = useItems(tag);

  return (
    <Draggable handle={`#windowhandle`} nodeRef={ref}>
      <div ref={ref} className={`${styles.GameFrame}`}>
        <header id={`windowhandle`} className={`${styles.GameFrameHeader}`}>
          <div> {name} </div>
          <button onClick={() => closeWindow(false)}>
            <Image width={20} height={20} src={"/window.svg"} alt={"close"} />
          </button>
        </header>
        <div data-container={tag} className={`${styles.GameWindow}`}>
          {children}
          {items.map((item) => (
            <RenderItem key={item.id} item={item} />
          ))}
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
    <GameWindow closeWindow={setOpen} name={name} key={name}>
      <gametemplate.type index={index} container={`GameWindow_${name}`} />
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
  const gametemplate = registry[name];
  const car = useContext(CarContext);
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
          `${name}${i}`,
          gametemplate,
        ),
      );
    return tmpwindows;
  });

  if (!car) return <div>no car no game</div>;

  return (
    <div
      style={{ left: `${x}%`, top: `${y}%` }}
      className={`${styles.GameButton}`}
    >
      <button
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
    </div>
  );
}
