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
      style={{
        zIndex: "2",
        height: "fit-content",
        width: "fit-content",
        position: "absolute",
        top: "2cqw",
        right: "2cqw",
        margin: "0.5cqw",
        backgroundColor: "grey",
        borderTopColor: "lightgrey",
        borderLeftColor: "lightgrey",
        borderRightColor: "darkgrey",
        borderBottomColor: "darkgrey",
        borderWidth: "0.5cqw",
      }}
    >
      <header
        id={`windowhandle`}
        style={{
          height: `2cqh`,
          width: "100%",
          font: "100% FireSans",
          backgroundColor: "darkblue",
        }}
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
          imgSrcs={["/elements/trash/trash_bee.png"]}
        />
        <ToggleButton
          onClick={() => setTeamOnly((prevValue) => !prevValue)}
          reset={"onRepeat"}
          imgSrcs={["/ui/team.svg"]}
        />
      </header>
      {!minimized && (
        <div
          style={{
            height: scale,
            width: scale,
            backgroundColor: "grey",
            borderTopColor: "lightgrey",
            borderLeftColor: "lightgrey",
            borderRightColor: "darkgrey",
            borderBottomColor: "darkgrey",
            borderWidth: "0.5cqw",
          }}
        >
          <MiniMap scale={scale} hazardsOn={hazardsOn} teamOnly={teamOnly} />
        </div>
      )}
    </div>
  );
}
