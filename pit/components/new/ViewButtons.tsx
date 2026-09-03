"use client";

import styles from "@/css/Index.module.css";

import { useView } from "@/components/new/ViewManager";
import { getAllViewIds } from "@/shared/viewRegistry";
import Image from "next/image";

export default function ViewButtons() {
  const { view, setView } = useView();
  const ids = getAllViewIds();
  const index = ids.indexOf(view);

  function goTo(offset: number) {
    const next = ids[index + offset];
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
      {index < ids.length - 1 && right}
    </div>
  );
}