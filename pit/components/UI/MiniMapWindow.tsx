import { createRef, useState } from "react";
import styles from "@/css/Game.module.css";
import MiniMap from "../MiniMap";
import PressButton from "./PressButton";
import ToggleButton from "./ToggleButton";

export default function MiniMapWindow({
  scale,
}: { scale: number } & React.PropsWithChildren) {
  const [minimized, setMinimized] = useState(false);
  const [hazardsOn, setHazardsOn] = useState(true);
  const [teamOnly, setTeamOnly] = useState(false);

  return (
    <div
      className={`${styles.GameFrame}`}
      style={{
        height: "fit-content",
        width: "fit-content",
        position: "absolute",
        top: "2cqw",
        right: "2cqw",
      }}
    >
      <header
        id={`windowhandle`}
        className={`${styles.GameFrameHeader}`}
        style={{ height: `2cqh`, width: "100%" }}
      >
        minimap
        <ToggleButton
          onClick={() => setMinimized((prevValue) => !prevValue)}
          reset={"onRepeat"}
          imgSrcs={["/ui/minimize.svg"]}
        />
        <ToggleButton
          onClick={() => setHazardsOn((prevValue) => !prevValue)}
          reset={"onRepeat"}
          imgSrcs={["/elements/trash/trash_bee.svg"]}
        />
        <ToggleButton
          onClick={() => setTeamOnly((prevValue) => !prevValue)}
          reset={"onRepeat"}
          imgSrcs={["/ui/team.svg"]}
        />
      </header>
      {!minimized && (
        <div
          style={{ height: scale, width: scale }}
          className={`${styles.GameWindowTheme}`}
        >
          <MiniMap scale={scale} hazardsOn={hazardsOn} teamOnly={teamOnly} />
        </div>
      )}
    </div>
  );
}
