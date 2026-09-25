import { useEffect, useState } from "react";
import Bolt from "../carComponents/Bolt";
import styles from "@/css/Game.module.css";
import { useRef } from "react";
import useItemStore, { Item } from "../engine/itemStore";
import AttachPoint from "../AttachPoint";
import atop from "@/lib/libft/atop";

export default function NormalWheel({
  tightenedPer,
  id,
  attachedTo,
}: {} & Item) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const tag = `normalwheel${id}`;
  const [bolted, setBolted] = useState<boolean[]>(
    tightenedPer
      ? [
          tightenedPer <= 0.25,
          tightenedPer <= 0.5,
          tightenedPer <= 0.75,
          tightenedPer <= 1.0,
        ]
      : [false, false, false, false],
  );
  const [attached, setAttached] = useState<boolean>(attachedTo ? true : false);
  const update = useItemStore().update;
  const self = useItemStore().items[id];

  function setBolt(setTo: boolean, index?: number) {
    const newTodos = [...bolted];
    newTodos[index ? index : 0] = setTo;
    setBolted(newTodos);
  }

  useEffect(() => {
    update(id, { tightenedPer: atop(bolted) });
  }, [bolted]);

  return (
    <div
      ref={wheelRef}
      className={`${styles.wheel} ${attached ? "attached" : undefined}`}
    >
      <Bolt
        x={50}
        y={25}
        setBolt={setBolt}
        index={0}
        tightened={tightenedPer ? tightenedPer <= 0.25 : false}
      />
      <Bolt
        x={50}
        y={75}
        setBolt={setBolt}
        index={1}
        tightened={tightenedPer ? tightenedPer <= 0.5 : false}
      />
      <Bolt
        x={25}
        y={50}
        setBolt={setBolt}
        index={2}
        tightened={tightenedPer ? tightenedPer <= 0.75 : false}
      />
      <Bolt
        x={75}
        y={50}
        setBolt={setBolt}
        index={3}
        tightened={tightenedPer ? tightenedPer <= 1.0 : false}
      />
      <img draggable={false} src={"/wheelnormal.svg"}></img>
      <AttachPoint
        attachedTo={attachedTo}
        tag={tag}
        setAttached={setAttached}
        style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
        target="spoke"
        offsetParent={{ x: 0.5, y: 0.5 }}
      />
    </div>
  );
}
