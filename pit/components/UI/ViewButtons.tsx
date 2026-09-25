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
    <button className={styles.leftViewButton} onClick={() => goTo(-1)}>
      <Image src={"/angle-left.svg"} fill={true} alt="arrowLeft" />
    </button>
  );

  const right = (
    <button className={styles.rightViewButton} onClick={() => goTo(1)}>
      <Image src={"/angle-right.svg"} fill={true} alt="arrowRight" />
    </button>
  );

  return (
    <div>
      {index > 0 && left}
      {index < views.length - 1 && right}
    </div>
  );
}
