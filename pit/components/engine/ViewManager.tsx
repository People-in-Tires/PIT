"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import ViewButtons from "@/components/UI/ViewButtons";
import Garage from "../views/Garage";
import Workbench from "../views/Workbench";
import Storage from "../views/Storage";
import Hotbar from "../UI/Hotbar";
import styles from "@/css/Game.module.css";
import { useWindowSize } from "./useWindowSize";
import { useEffect } from "react";
import useItemStore, { useItems } from "./itemStore";
import useCarStore, { useCar } from "./carStore";
import MiniMapWindow from "../UI/MiniMapWindow";

export type ViewTag = "garage" | "workbench" | "storage";

export const viewRegistry: Record<ViewTag, React.ComponentType<IView>> = {
  garage: Garage,
  workbench: Workbench,
  storage: Storage,
};

export interface IView {
  foo?: number;
}

interface ViewContextType {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function useView() {
  const context = useContext(ViewContext);
  if (!context) throw new Error("useView must be used within ViewManager");
  return context;
}

export function ViewManager({
  initialView,
  isLoggedIn,
  children,
}: {
  initialView: string;
  isLoggedIn: boolean;
  children?: React.ReactNode;
}) {
  const [view, setView] = useState(initialView);
  const { windowHeight, windowWidth } = useWindowSize();
  const heightRef = useRef(windowHeight);
  const widthRef = useRef(windowWidth);
  const ActiveView = viewRegistry[view as ViewTag];
  const setCarDefault = useCarStore().setCarDefault;
  const move = useItemStore().move;
  const items = useItemStore().items;

  useEffect(() => {
    let scalar: number = 1;
    scalar = windowHeight / heightRef.current;
    heightRef.current = windowHeight;
    widthRef.current = windowWidth;
    for (const item of items)
      move(item.id, { ...item, x: item.x * scalar, y: item.y * scalar });
  }, [windowHeight, windowWidth]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          borderTopColor: "lightgrey",
          borderLeftColor: "lightgrey",
          borderRightColor: "darkgrey",
          borderBottomColor: "darkgrey",
          borderWidth: "0.5em",
          maxWidth: "100%",
          maxHeight: "100%",
          overflow: "hidden",
          height: windowHeight,
          width: windowWidth,
          containerType: "inline-size",
        }}
      >
        <ViewContext value={{ view, setView, isLoggedIn }}>
          {ActiveView ? <ActiveView /> : ""}
          {children}
          <ViewButtons />
          <MiniMapWindow scale={windowWidth * 0.2} />
          <Hotbar />
        </ViewContext>
      </div>
    </div>
  );
}
