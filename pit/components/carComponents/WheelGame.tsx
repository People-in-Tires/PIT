import { MiniGameProps } from "@/components/GameButton";
import React, { createContext, createRef, useEffect, useState } from "react";
import style from "@/css/Game.module.css";

export default function WheelGame({ metadata, setOutput }: {} & MiniGameProps) {
  //wheel context tracks bolts
  //have wheel function and pass as child the specifics
  const [wheel, setWheel] = useState<React.JSX.Element>(
    metadata["wheel"] as React.JSX.Element,
  );

  return (
    <div>
      <div
        className={`${style.hitbox} spoke`}
        style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
      ></div>
    </div>
  );
}
