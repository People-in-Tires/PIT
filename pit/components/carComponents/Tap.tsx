"use client";
import { CSSProperties, useRef, useState } from "react";
import { useEffect } from "react";
import useItemStore from "../engine/itemStore";
import styles from "@/css/Game.module.css";
function Faucet({ flowrate = 1000, left }: { flowrate: number; left: number }) {
  const tapref = useRef<HTMLDivElement>(null);
  const [targetID, setTargetID] = useState<number>(-1);
  const [pressed, setPressed] = useState<boolean>(false);
  const update = useItemStore().update;

  function fill() {
    const item = useItemStore.getState().items[targetID];
    if (item.fullness == undefined || item.fluid_cap == undefined) return;
    if (item.fullness + flowrate > item.fluid_cap) {
      update(targetID, { fullness: item.fluid_cap });
      //winge maybe spill
    } else if (item.fullness + flowrate < item.fluid_cap)
      update(targetID, { fullness: flowrate + item.fullness });
  }
  function receiveattach(e: Event) {
    setTargetID((e as CustomEvent).detail.attachedID);
  }


  useEffect(() => {
    console.log(pressed, targetID);
    if (targetID != -1 && pressed == true) {
      const interval = setInterval(fill, 50);
      return () => clearInterval(interval);
    }
  }, [targetID, pressed]);


  useEffect(() => {
    tapref.current?.addEventListener("attach", receiveattach);
    return () => {
      tapref.current?.removeEventListener("attach", receiveattach);
    };
  }, [tapref, setTargetID]);

  return (
    <div
      style={{
        height: "50%",
        aspectRatio: "1/2",
        left: `${left}%`,
        position: "absolute",
      }}
    >
      <button
        style={{
          height: "50%",
          aspectRatio: "1/1",
          left: "25%",
          width: "50%",
          position: "absolute",
        }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
      />
      <div
        ref={tapref}
        style={{
          top: "50%",
          height: "50%",
          left: "25%",
          width: "50%",
          position: "absolute",
        }}
        className={`${styles.hitbox} tap`}
      />
      <img src={pressed ? "/beer_tap_tapping.png" : "/beer_tap_idle.png"}></img>
    </div>
  );
}

export default function Tap({ style }: { style: CSSProperties }) {
  return (
    <div className={styles.item} style={style}>
      <img
        src={"/beer_tap_base.png"}
        style={{ height: "100%", width: "100%" }}
      />
      <Faucet flowrate={1000} left={10} />
      <Faucet flowrate={1000} left={35} />
      <Faucet flowrate={1000} left={60} />
    </div>
  );
}
