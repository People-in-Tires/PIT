import { createRef, useState } from "react";
import DraggableItem from "../DraggableItem";
import { ItemProps } from "../item";
import styles from "@/css/Game.module.css";
import { useEffect } from "react";
//maybe give a enum to make the right wheel instead of children unless wrap wheel flintstone
export default function Wheel({
  wheeltype,
}: { wheeltype: "normal" | "hard" | "soft" | "wets" } & ItemProps) {
  const nodeRef = createRef<HTMLDivElement>();
  const [bolted, setBolted] = useState<boolean[]>([true, true, true, true]);

  const setBolt = (index: number, setTo: boolean) => {
    const newTodos = [...bolted];
    newTodos[index] = setTo;
    setBolted(newTodos);
  };

  function Bolt({
    bolt_length = 360,
    x = 0,
    y = 0,
    index,
  }: { bolt_length?: number; index: number } & ItemProps) {
    const [rotation, setRotation] = useState<number>(bolt_length);
    const ref = createRef<HTMLDivElement>();

    function Rotate(e: Event) {
      const customE = e as CustomEvent;

      setRotation((prevRotation): number => {
        let newRot = prevRotation + customE.detail.delta_rotation;
        if (newRot > bolt_length) {
          setBolt(index, true);
          newRot = bolt_length;
        } else setBolt(index, false);

        if (newRot < 0) {
          newRot %= 360;
        }
        return newRot;
      });
    }

    useEffect(() => {
      ref.current?.addEventListener("rotate", Rotate);
      return () => {
        ref.current?.removeEventListener("rotate", Rotate);
      };
    }, []);

    return (
      <div
        ref={ref}
        className={`${styles.item} ${styles.bolt} ${bolted[index] ? "fastened" : "unfastened"}`}
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

  const SoftWheel = () => {
    return (
      <div
        className={`${styles.wheel}`}
        style={{
          backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/German_garden_gnome.jpg/960px-German_garden_gnome.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail")`,
        }}
      >
        <Bolt x={25} y={50} index={0} />
        <Bolt x={75} y={50} index={1} />
      </div>
    );
  };

  const HardWheel = () => {
    return (
      <div
        className={`${styles.wheel}`}
        style={{
          backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Abandoned_millstone_-_geograph.org.uk_-_1099201.jpg/960px-Abandoned_millstone_-_geograph.org.uk_-_1099201.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail")`,
        }}
      >
        <Bolt x={50} y={50} bolt_length={720} index={0} />
      </div>
    );
  };

  const NormalWheel = () => {
    return (
      <div
        className={`${styles.wheel}`}
        style={{
          backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/German_garden_gnome.jpg/960px-German_garden_gnome.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail")`,
        }}
      >
        <Bolt x={25} y={25} index={0} />
        <Bolt x={25} y={75} index={1} />
        <Bolt x={75} y={25} index={2} />
        <Bolt x={75} y={75} index={3} />
      </div>
    );
  };

  const WetWheel = () => {
    return (
      <div
        className={`${styles.wheel}`}
        style={{
          backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Wheel_Iran.jpg/960px-Wheel_Iran.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail")`,
        }}
      >
        <Bolt x={25} y={50} index={0} />
        <Bolt x={75} y={50} index={1} />
      </div>
    );
  };

  return (
    <DraggableItem
      nodeRef={nodeRef}
      disabled={!bolted.every((v) => v === false)}
    >
      <div>
        {" "}
        not working cause eslint is a bitch and doesnt allow illegal jank{" "}
      </div>
    </DraggableItem>
  );
}
