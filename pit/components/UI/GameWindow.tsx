"use client";

import styles from "@/css/Game.module.css";

import { useEffect } from "react";
import {
  registerStopHandler,
  unregisterStopHandler,
} from "@/components/engine/itemHandlerRegistry";
import { toLocalCoords } from "../engine/itemHandlerHelpers";
import useItemStore from "@/components/engine/itemStore";
import { useItems } from "@/components/engine/itemStore";
import RenderItem from "@/components/engine/RenderItem";
import { GameWindow } from "@/components/UI/GameButton";

export function AltGameWindow(title: string) {
  const tag = "GameWindow_" + title;
  const items = useItems(tag);

  useEffect(() => {
    registerStopHandler(tag, () => {
      // temporarily returns false to trigger default handler
      // same as not registering

      return false;
    });

    return () => unregisterStopHandler(tag);
  }, []);

  // add default items

  return (
    <GameWindow
      data-container={tag}
      closeWindow={(index: number | number[], value: boolean) => {}}
      index={10}
    >
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </GameWindow>
  );
}
