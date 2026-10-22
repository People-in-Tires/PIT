"use client";

import styles from "@/css/Index.module.css";

import { useView, viewRegistry } from "@/components/engine/ViewManager";
import Image from "next/image";

export default function ViewButtons() {
  const { view, setView } = useView();
  const views = Object.keys(viewRegistry);
  const index = views.indexOf(view);

  function goTo(offset: number) {
    const next = views[index + offset];
    if (next) setView(next);
  }

  const left = (
    <button
      style={{
        position: "fixed",
        height: "10%",
        aspectRatio: 1,
        left: "0%",
        top: "45%",
      }}
      onClick={() => goTo(-1)}
    >
      <Image
        src={"/ui/angle-left.svg"}
        fill={true}
        alt="arrowLeft"
        draggable={false}
      />
    </button>
  );

  const right = (
    <button
      style={{
        position: "fixed",
        height: "10%",
        aspectRatio: 1,
        right: "0%",
        top: "45%",
      }}
      onClick={() => goTo(1)}
    >
      <Image
        src={"/ui/angle-right.svg"}
        fill={true}
        alt="arrowRight"
        draggable={false}
      />
    </button>
  );

  return (
    <div>
      {index > 0 && left}
      {index < views.length - 1 && right}
    </div>
  );
}
