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
      className={styles.GameFrameTheme}
      style={{
        height: "fit-content",
        width: "10vw",
        position: "relative",
        left: "110%",
        top: "-10%",
      }}
    >
      <header id={`windowhandle`} className={`${styles.GameFrameHeader}`}>
        {type}
      </header>
      <ul>
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
