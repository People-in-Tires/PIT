"use client";

import styles from "@/css/Game.module.css";
import { useEffect } from "react";
import useItemStore from "@/components/engine/itemStore";
import {
  Handler,
  registerStopHandler,
  unregisterStopHandler,
} from "@/components/engine/itemHandlerRegistry";
import Image from "next/image";

export default function Bin() {
  const tag = "bin";

  useEffect(() => {
    registerStopHandler<Handler>(tag, ({ id }) => {
      const remove = useItemStore.getState().remove;
      // is item valuable?
      remove(id);
      return true;
    });

    return () => unregisterStopHandler(tag);
  }, []);

  return (
    <div
      data-container={tag}
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
