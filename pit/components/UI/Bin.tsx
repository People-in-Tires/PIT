"use client";

import styles from "@/css/Game.module.css";
import { CSSProperties, useEffect } from "react";
import useItemStore from "@/components/engine/itemStore";
import {
  action,
  Handler,
  registerStopHandler,
  unregisterStopHandler,
} from "@/components/engine/itemHandlerRegistry";
import Image from "next/image";

export default function Bin({ style }: { style: CSSProperties }) {
  const tag = "bin";

  useEffect(() => {
    registerStopHandler<Handler>(tag, ({ id }) => {
      const remove = useItemStore.getState().remove;
      // is item valuable?
      remove(id);
      return action.done;
    });

    return () => unregisterStopHandler(tag);
  }, []);

  return (
    <div
      data-container={tag}
      style={{
        ...style,
        position: "absolute",
        width: 60,
        height: 60,
      }}
    >
      <Image src={"/elements/items/bin.png"} fill={true} alt="bin" />
    </div>
  );
}
