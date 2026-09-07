"use client";

import styles from "@/css/Game.module.css";

import { useEffect } from "react";
import {
  registerDropHandler,
  unregisterDropHandler,
  toLocalCoords,
} from "@/shared/dropRegistry";
import useItemStore from "@/components/new/itemStore";
import { useItems } from "@/components/new/itemStore";
import RenderItem from "@/components/new/RenderItem";
import { GameWindow } from "@/components/GameButton";

export function altGameWindow(title: string) {
  const formalTitle = "GameWindow_" + title;
  const items = useItems(formalTitle);

  useEffect(() => {
    registerDropHandler(formalTitle, () => {

      // temporarily returns false to trigger default handler
      // same as not registering

      return false;
    });

    return () => unregisterDropHandler(formalTitle);
  }, [])

  // add default items

  return (
    <GameWindow closeWindow={(index: number | number[], value: boolean) => {}} index={10}>
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </GameWindow>
  )
}
