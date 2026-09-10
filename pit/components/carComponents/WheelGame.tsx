import { MiniGameProps } from "@/components/UI/GameButton";
import React, {
  createContext,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "@/css/Game.module.css";

export default function WheelGame({ metadata, setOutput }: {} & MiniGameProps) {
  return (
    <div>
      <div
        className={`${style.hitbox} spoke`}
        style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
      ></div>
    </div>
  );
}
