import Image from "next/image";
import styles from "../css/Index.module.css";
import { VIEW } from "../page";
import { ViewContext } from "../page";
import { useContext } from "react";

export default function View() {
  const viewContext = useContext(ViewContext)
  if (viewContext === undefined) return;

  const backgrounds: string[] = [
    "/car2.png",
    "/window.svg",
    "/leaf.png",
    "/beer.png",
  ];

  return (
    <div>
      <Image
        src={backgrounds[viewContext.view]}
        width={1920}
        height={1080}
        alt="background"
      />
      <Buttons />
    </div>
  );
}

function Buttons() {
  const viewContext = useContext(ViewContext)
  if (viewContext === undefined) return;

  let left: React.JSX.Element | null = null
  let right: React.JSX.Element | null = null

  if (viewContext.view > 0)
    left = (
      <button
        id={`${styles.LeftButton}`}
        onClick={() => {
          viewContext.setView(viewContext.view--)
          console.log("decremented view")
        }}
      >
        <Image src={"/vercel.svg"} width={80} height={80} alt="arrowLeft" />
      </button>
    )

  if (viewContext.view < VIEW.end - 1)
    right = (
      <button
        id={`${styles.RightButton}`}
        onClick={() => {
          viewContext.setView(viewContext.view++)
          console.log("incremented view")
        }}
      >
        <Image src={"/vercel.svg"} width={80} height={80} alt="arrowRight" />
      </button>
    )

  return (
    <div>
      {left}
      {right}
    </div>
  );
}
