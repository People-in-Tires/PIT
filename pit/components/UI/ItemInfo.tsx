import { Item } from "../engine/itemStore";
import styles from "@/css/Game.module.css";

export default function ItemInfo({
  type,
  fullness,
  fluid_cap,
  tightenedPer,
  wear,
}: {} & Item) {
  if (
    wear == undefined &&
    fullness == undefined &&
    fluid_cap == undefined &&
    tightenedPer == undefined
  )
    return;
  return (
    <div
      style={{
        margin: "0.5cqw",
        backgroundColor: "grey",
        borderRightColor: "lightgrey",
        borderBottomColor: "lightgrey",
        borderLeftColor: "darkgrey",
        borderTopColor: "darkgrey",
        borderWidth: "0.5cqw",
        height: "fit-content",
        width: "fit-content",
        position: "relative",
        left: "110%",
        top: "-10%",
      }}
    >
      <header
        id={`windowhandle`}
        style={{
          height: "2cqh",
          width: "100%",
          font: `100% "FireSans"`,
          backgroundColor: "darkblue",
        }}
      >
        {type}
      </header>
      <ul style={{ width: `20em` }}>
        <li>
          {fullness != undefined &&
            fluid_cap != undefined &&
            `fluid: ${(fullness / 1000).toFixed(1)}/${(fluid_cap / 1000)?.toFixed(0)}L`}
        </li>
        <li>{wear != undefined && `Wear: ${wear.toFixed(1)}/100%`}</li>
        <li>
          {tightenedPer != undefined &&
            `Tightened: ${(tightenedPer * 100).toFixed(0)}/100%`}
        </li>
      </ul>
    </div>
  );
}
