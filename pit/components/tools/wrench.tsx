import Draggable, { DraggableData } from "react-draggable";
import { ItemProps } from "../engine/item";
import {
  Children,
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ControlPosition } from "react-draggable";
import addTo from "@/lib/libft/addTo";
import styles from "@/css/Game.module.css";
import DraggableItem, {
  findContainersAt,
  findInteractablesWithin,
} from "../engine/DraggableItem";
import overlap from "@/lib/libft/overlap";
import getAngle from "@/lib/libft/getangle";
import {
  registerStartHandler,
  registerStopHandler,
  registerDragHandler,
  Handler,
  InteractableHandler,
  unregisterDragHandler,
  unregisterStopHandler,
} from "../engine/itemHandlerRegistry";
import useItemStore from "../engine/itemStore";

export default function Wrench({}: ItemProps) {
  const headref = useRef<HTMLDivElement>(null);
  const boltRef = createRef<Element>();
  const [attached, setAttached] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const move = useItemStore().move;

  function setBoltRef({ id }: Handler) {
    if (boltRef.current != null) {
      boltRef.current = null;
      setAttached(false);
      return true;
    }
    if (!headref.current) return true;
    const interactableElement = overlap(
      headref.current,
      styles.bolt,
      "attached",
    );
    if (!interactableElement) return true;
    boltRef.current = interactableElement;
    const boltReq = interactableElement.getBoundingClientRect();
    const headReq = headref.current.getBoundingClientRect();
    const containers = findContainersAt(boltReq.left, boltReq.top);
    if (containers.length == 0) return true;
    setAttached(true);
    for (const containerAt of containers) {
      move(
        id,
        containerAt.name,
        boltReq.left + boltReq.width / 2 - headReq.width,
        boltReq.top + boltReq.height / 2 - headReq.height,
      );
    }
    return false;
  }

  function rotate({ id, mouse }: Handler) {
    if (boltRef.current == null || mouse == undefined) return true;
    const parentReq = boltRef.current.getBoundingClientRect();
    const tmp_rotate = getAngle(
      mouse.x,
      mouse.y,
      parentReq.x + parentReq.width / 2,
      parentReq.y + parentReq.height / 2,
    );
    const delta_rotation = ((tmp_rotate - rotation - 270) % 360) + 180;
    console.log(tmp_rotate, delta_rotation, rotation);
    setRotation((prevRotation) => (prevRotation + delta_rotation) % 360);
    boltRef.current.dispatchEvent(
      new CustomEvent("rotate", {
        detail: { rotation: rotation, delta_rotation: delta_rotation },
      }),
    );
    return false;
  }

  useEffect(() => {
    registerStopHandler("wrench", setBoltRef);
    registerDragHandler("wrench", rotate);
    console.log("mounting wrench");
    return () => {
      unregisterStopHandler("wrench");
      unregisterDragHandler("wrench");
      console.log("unmounting wrench");
    };
  }, []);

  return (
    <div
      className={`${styles.wrench} ${styles.tool} ${attached ? "attached" : undefined}`}
    >
      <div
        style={{
          backgroundImage: `url("/wrench.svg")`,
          backgroundSize: `contain`,
          backgroundRepeat: `no-repeat`,
          height: "100%",
          transformOrigin: `50% 10%`,
          rotate: `${rotation}deg`,
        }}
      >
        <div
          ref={headref}
          style={{ height: "10%", width: "50%", left: "25%", top: "5%" }}
          className={`${styles.hitbox}`}
        ></div>
        <div
          id={"handle"}
          style={{
            position: "absolute",
            height: "40%",
            width: "100%",
            top: "55%",
          }}
        ></div>
      </div>
    </div>
  );
}
