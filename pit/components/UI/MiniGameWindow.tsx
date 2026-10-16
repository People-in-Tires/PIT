import Draggable from "react-draggable";
import { createRef, useState } from "react";
import styles from "@/css/Game.module.css"
import Image from "next/image";
import MiniMap from "../MiniMap";

export default function MiniMapWindow({
  height, width
}: {height: number, width: number
} & React.PropsWithChildren) {
  const [minimized, setMinimized] = useState(false)

  return (
	<div className={`${styles.GameFrameStyle}`} style={{position: "absolute", height: height, width: width, top: "2cqw", right: "2cqw"}}>
		<header id={`windowhandle`} className={`${styles.GameFrameHeader}`}>
			minimap
			<button onClick={() => setMinimized(prevValue=>!prevValue)} style={{ height: "80%" }}>
				<Image width={20} height={20} src={"/window.svg"} alt={"close"} />
			</button>
		</header>
		{!minimized && <div
			style={{height: height, width: "inherit"}}
			className={`${styles.GameWindowTheme} container`}
		>
			<MiniMap height={height * 0.90} width={width}/>
		</div>}
	</div>
  );
}