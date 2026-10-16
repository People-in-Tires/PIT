import { Item } from "../engine/itemStore";
import styles from "@/css/Game.module.css";

export default function ItemInfo({
  type,
  fullness,
  fluid_cap,
  wear,
}: {} & Item) {
  if (wear == undefined && fullness == undefined) return ; 
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
      {fullness &&
        fluid_cap &&
        `fluid: ${(fullness / 1000).toFixed(1)}/${(fluid_cap / 1000)?.toFixed(0)}L`}
      {wear && `wear: ${(wear).toFixed(1)}%`}
    </div>
  );
}
