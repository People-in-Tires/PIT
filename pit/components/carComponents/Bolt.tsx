import { useState, createRef, useContext, useEffect, useRef } from "react";
import { ItemProps } from "@/components/item";
import styles from "@/css/Game.module.css";
import { GameWindowContext } from "@/app/page";
import Image from "next/image";
import { overlap } from "@/lib/libft/overlap";

//shitty macro
const bolt_length = 360;

export function Bolt({ x = 0, y = 0 }: {} & ItemProps) {
  const [rotation, setRotation] = useState<number>(bolt_length);
  const [fastened, setFastened] = useState<boolean>(true);
  const ref = createRef<HTMLDivElement>();

  function useEventListen(e: Event) {
    const customE = e as CustomEvent;

    setRotation((prevRotation): number => {
      let newRot = prevRotation + customE.detail.delta_rotation;
      if (newRot > bolt_length) {
        setFastened(true);
        newRot = bolt_length;
      } else setFastened(false);

      if (newRot < 0) {
        newRot %= 360;
      }
      return newRot;
    });
  }
  useEffect(() => {
    ref.current?.addEventListener("rotate", useEventListen);
    return () => {
      ref.current?.removeEventListener("rotate", useEventListen);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`${styles.item} ${styles.bolt} ${fastened ? "fastened" : "unfastened"}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <img
        style={{ rotate: `${rotation}deg`, transformOrigin: "50% 50%" }}
        draggable={false}
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Usain_Bolt_Olympics_Celebration.jpg/960px-Usain_Bolt_Olympics_Celebration.jpg"
        }
      ></img>
    </div>
  );
}

export function BoltBox() {
  const tmp = useContext(GameWindowContext);
  if (!tmp) return;
  const { state, setState } = tmp;

  return (
    <button
      onClick={() => {
        setState([...state, <Bolt key={state.length} />]);
      }}
      id="BoltButton"
    >
      <Image
        draggable="false"
        src={"/beer.png"}
        width={150}
        height={150}
        alt="boldbox"
      />
    </button>
  );
}

export function addBolt(item: HTMLElement) {
  const tmp = document.getElementsByClassName(`${styles.bolthole}`);
  if (tmp.length == 0) return;

  for (let i = 0; i < tmp.length; i++) {
    if (
      overlap(item.getBoundingClientRect(), tmp[i].getBoundingClientRect()) &&
      tmp[i].getElementsByClassName(`${styles.item}`).length == 0
    ) {
      // tmp[i].appendChild(item);
      tmp[i].moveBefore(item, null);
      break;
    }
  }
}

export function BoltHole({
  top,
  left,
  index,
  bolted,
  setBolted,
}: {
  top: number;
  left: number;
  index: number;
  bolted: boolean;
  setBolted: (index: number, setTo: boolean) => void;
}) {
  const nodeRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const len = nodeRef.current?.getElementsByClassName("bolt").length;
    console.log(nodeRef.current, len);

    if (len != 0 && bolted != true) setBolted(index, true);
    else if (len == 0 && bolted != false) setBolted(index, false);
    else console.log("hello");
  });

  return (
    <div
      ref={nodeRef}
      className={styles.bolthole}
      style={{ top: `${top}%`, left: `${left}%` }}
    >
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Black_hole_-_Messier_87.jpg/960px-Black_hole_-_Messier_87.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
        }
        className={styles.bolthole}
      ></img>
      {bolted && <Bolt />}
    </div>
  );
}
