"use client";

import styles from "@/css/Game.module.css";

import { useEffect } from "react";
import {
  registerDropHandler,
  unregisterDropHandler,
  toLocalCoords,
} from "@/shared/dropRegistry";
import useItemStore from "@/components/engine/itemStore";
import { useItems } from "@/components/engine/itemStore";
import RenderItem from "@/components/engine/RenderItem";
import { GameWindow } from "@/components/UI/GameButton";

export function AltGameWindow(title: string) {
  const formalTitle = "GameWindow_" + title;
  const items = useItems(formalTitle);

  useEffect(() => {
    registerDropHandler(formalTitle, () => {
      // temporarily returns false to trigger default handler
      // same as not registering

      return false;
    });

    return () => unregisterDropHandler(formalTitle);
  }, []);

  // add default items

  return (
    <GameWindow
      closeWindow={(index: number | number[], value: boolean) => {}}
      index={10}
    >
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </GameWindow>
  );
}
