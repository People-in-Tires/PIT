"use client";

import styles from "@/css/Game.module.css";
import { useEffect } from "react";
import useItemStore from "@/components/new/itemStore";
import {
  DropContext,
  registerDropHandler,
  unregisterDropHandler,
} from "@/shared/dropRegistry";
import Image from "next/image";

export default function Bin() {
  useEffect(() => {
    registerDropHandler("bin", ({ id }: DropContext) => {
      const remove = useItemStore.getState().remove;
      remove(id);
      return true;
    });

    return () => unregisterDropHandler("bin");
  }, []);

  return (
    <div
      data-container="bin"
      className={styles.bin}
      style={{
        position: "absolute",
        bottom: "5%",
        right: "5%",
        width: 60,
        height: 60,
      }}
    >
      <Image src={"/bin.png"} fill={true} alt="bin" />
    </div>
  );
}
