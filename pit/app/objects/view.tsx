import Image from "next/image";
import styles from "../css/Index.module.css";
import Home, { VIEW } from "../page";
import { ViewContext } from "../page";
import React, { useContext, useState } from "react";
import Laptop from "./laptop";
import Car from "./car";
import { BeerCrate } from "./beer";
import { Bolt, BoltBox } from "./bolt";
import Wrench from "./wrench";

const backgrounds: string[] = [
  "/background-brick-1.jpg",
  "/background-brick-2.jpg",
  "/background-brick-2.jpg",
];

function Garage() {
  const driver1id = 0;
  const driver2id = 1;
  const car1here = true; //have to be states
  const car2here = false;
  return (
    <div>
      {car1here && <Car id={driver1id} />}
      {car2here && <Car id={driver2id} />}
    </div>
  );
}

function WorkShop() {
  return (
    <div>
      <BeerCrate />
      <BoltBox />
    </div>
  );
}

export default function View() {
  const context = useContext(ViewContext);
  if (context === undefined) return;
  const { view, setView } = context;

  if (view < 0 || view >= VIEW.end) setView(VIEW.garage);

  return (
    <div>
      <Image
        src={backgrounds[view]}
        width={2560}
        height={1440}
        alt="background"
        style={{
          zIndex: -1,
          position: "absolute",
          opacity: 1,
          width: "100%",
          height: "100%",
          aspectRatio: "2",
          objectFit: "cover",
        }}
      />
      {view === VIEW.garage && <Garage />}
      {view === VIEW.laptop && <Laptop />}
      {view === VIEW.bench && <WorkShop />}
      <ViewButtons />
      <Wrench />
    </div>
  );
}

// function Car() {
//   return (
//     <Image
//       src="/car2.png"
//       alt="car"
//       width={2560}
//       height={1440}
//       style={{
//         position: "absolute",
//         bottom: 0,
//         left: "30%",
//         opacity: 0.5,
//         width: "50%",
//         height: "50%",
//         objectFit: "contain",
//       }}
//     />
//   );
// }

function ViewButtons() {
  const context = useContext(ViewContext);
  if (context === undefined) return;
  const { view, setView } = context;

  const left = (
    <button id={`${styles.LeftButton}`} onClick={() => setView(view - 1)}>
      <Image src={"/angle-left.svg"} fill={true} alt="arrowLeft" />
    </button>
  );

  const right = (
    <button id={`${styles.RightButton}`} onClick={() => setView(view + 1)}>
      <Image src={"/angle-right.svg"} fill={true} alt="arrowRight" />
    </button>
  );

  return (
    <div>
      {view > 0 && left}
      {view < VIEW.end - 1 && right}
    </div>
  );
}
