import styles from "../../Index.module.css";
import Draggable from "react-draggable";
import { createRef, useEffect, useState } from "react";
import { BoltHole } from "@/app/objects/bolt";
export default function WheelFlintstone({
  ready = false,
}: {
  ready?: boolean;
}) {
  const ref = createRef<HTMLDivElement>();
  const [bolted, setBolted] = useState<boolean[]>([ready, ready, ready, ready]);

  useEffect(() => {
    console.log(bolted);
  }, [bolted]);
  const setBolt = (index: number, setTo: boolean) => {
    const newTodos = [...bolted];
    newTodos[index] = setTo;
    setBolted(newTodos);
  };
  return (
    <Draggable nodeRef={ref} disabled={!bolted.every((v) => v === false)}>
      <div
        ref={ref}
        style={{
          height: "250px",
          width: "250px",
          backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Abandoned_millstone_-_geograph.org.uk_-_1099201.jpg/960px-Abandoned_millstone_-_geograph.org.uk_-_1099201.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail")`,
        }}
        className={`${styles.wheel}`}
      >
        <BoltHole
          top={25}
          left={25}
          index={0}
          bolted={bolted[0]}
          setBolted={setBolt}
        />
        <BoltHole
          top={25}
          left={75}
          index={1}
          bolted={bolted[1]}
          setBolted={setBolt}
        />
        <BoltHole
          top={75}
          left={25}
          index={2}
          bolted={bolted[2]}
          setBolted={setBolt}
        />
        <BoltHole
          top={75}
          left={75}
          index={3}
          bolted={bolted[3]}
          setBolted={setBolt}
        />
      </div>
    </Draggable>
  );
}
