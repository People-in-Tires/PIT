"use client";
import { CSSProperties, useRef, useState } from "react";
import { useEffect } from "react";
import useItemStore from "../engine/itemStore";
import styles from "@/css/Game.module.css";

function fill(id: number, flowrate: number) {
  const update = useItemStore.getState().update;
  const item = useItemStore.getState().items[id];
  if (item.fullness == undefined || item.fluid_cap == undefined) return;
  if (item.fullness + flowrate > item.fluid_cap) {
    update(id, { fullness: item.fluid_cap });
    //winge maybe spill
  } else if (item.fullness + flowrate < item.fluid_cap)
    update(id, { fullness: flowrate + item.fullness });
}

function Faucet({ flowrate = 1000, left }: { flowrate: number; left: number }) {
  const tapref = useRef<HTMLDivElement>(null);
  const [targetID, setTargetID] = useState<number>(-1);
  const [pressed, setPressed] = useState<boolean>(false);

  useEffect(() => {
    if (targetID != -1 && pressed == true) {
      const interval = setInterval(() => fill(targetID, flowrate), 50);
      return () => clearInterval(interval);
    }
  }, [targetID, pressed, flowrate]);

  function receiveattach(e: Event) {
    setTargetID((e as CustomEvent).detail.attachedID);
  }

  useEffect(() => {
    const ref = tapref.current;
    if (!ref) return;
    ref.addEventListener("attach", receiveattach);
    return () => {
      ref.removeEventListener("attach", receiveattach);
    };
  }, [tapref, setTargetID]);

  return (
    <div
      style={{
        height: "50%",
        aspectRatio: "1/2",
        top: "5%",
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
      <img
        src={
          pressed
            ? "/elements/tap/beer_tap_tapping.png"
            : "/elements/tap/beer_tap_idle.png"
        }
        alt="faucet"
        style={{ height: "100%", width: "100%" }}
      ></img>
    </div>
  );
}

export default function Tap({ style }: { style: CSSProperties }) {
  return (
    <div style={{ ...style, position: "absolute" }}>
      <img
        alt="tapbase"
        src={"/elements/tap/beer_tap_base.png"}
        style={{ height: "100%", width: "100%" }}
      />
      <Faucet flowrate={1000} left={10} />
      <Faucet flowrate={1000} left={35} />
      <Faucet flowrate={1000} left={60} />
    </div>
  );
}
