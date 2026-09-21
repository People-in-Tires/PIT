"use client";
import { useRef, useState } from "react";
import { useEffect } from "react";
import useItemStore from "../engine/itemStore";
import styles from "@/css/Game.module.css";
function Faucet({ flowrate = 1000 }: { flowrate: number }) {
  const tapref = useRef<HTMLDivElement>(null);
  const [targetID, setTargetID] = useState<number>(-1);
  const [pressed, setPressed] = useState<boolean>(false);
  const update = useItemStore().update;

  useEffect(() => {
    console.log(pressed, targetID);
    if (targetID != -1 && pressed == true) {
      let interval: NodeJS.Timeout;
      interval = setInterval(fill, 50);
      return () => clearInterval(interval);
    }
  }, [targetID, pressed]);

  function fill() {
    const item = useItemStore.getState().items[targetID];
    if (item.fullness != undefined)
      update(targetID, { fullness: item.fullness + flowrate });
  }
  function receiveattach(e: Event) {
    setTargetID((e as CustomEvent).detail.attachedID);
  }

  useEffect(() => {
    tapref.current?.addEventListener("attach", receiveattach);
    return () => {
      tapref.current?.removeEventListener("attach", receiveattach);
    };
  }, [tapref, setTargetID]);

  return (
    <div
      style={{
        height: "200px",
        width: "100px",
        left: "50px",
        position: "absolute",
      }}
    >
      <button
        style={{ height: "30px", width: "100px", position: "absolute" }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
      >
        <img src={"/beer.png"}></img>
      </button>
      <div
        ref={tapref}
        className="tap"
        style={{ top: "100px", height: "100px", width: "100px" }}
      >
        <img src={"/bin.png"}></img>
      </div>
    </div>
  );
}

export default function Tap() {
  return (
    <div className={styles.item} style={{ top: "500px", left: "500px" }}>
      <Faucet flowrate={1000} />
    </div>
  );
}
