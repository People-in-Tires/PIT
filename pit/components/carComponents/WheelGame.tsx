import { MiniGameProps } from "@/components/UI/GameButton";
import React, {
  createContext,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "@/css/Game.module.css";
import Wheel from "./Wheel";

export default function WheelGame({ metadata, setOutput }: {} & MiniGameProps) {
  const spokeRef = createRef<HTMLDivElement>();
  const [wheel, setWheel] = useState<React.JSX.Element>();

  return (
    <div>
      <div
        ref={spokeRef}
        className={`${style.hitbox} spoke`}
        style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
      ></div>
      <Wheel
        wheeltype="normal"
        tightenedPer={
          typeof metadata["tightenedPer"] === "number"
            ? metadata["tightenedPer"]
            : undefined
        }
        spokeRef={spokeRef}
      />
    </div>
  );
}
