"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import ViewButtons from "@/components/UI/ViewButtons";
import Garage from "../views/Garage";
import Workbench from "../views/Workbench";
import Desk from "../views/Desk";
import Storage from "../views/Storage";
import Hotbar from "../UI/Hotbar";
import styles from "@/css/Game.module.css";
import { useWindowSize } from "./useWindowSize";
import { useEffect } from "react";
import useItemStore, { useItems } from "./itemStore";
import useCarStore, { useCar } from "./carStore";

export type ViewTag = "garage" | "workbench" | "storage" | "desk";

export const viewRegistry: Record<ViewTag, React.ComponentType<IView>> = {
  garage: Garage,
  workbench: Workbench,
  storage: Storage,
  desk: Desk,
};

export interface IView {
  foo?: number;
}

interface ViewContextType {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function useView() {
  const context = useContext(ViewContext);
  if (!context) throw new Error("useView must be used within ViewManager");
  return context;
}

export function ViewManager({
  initialView,
  children,
}: {
  initialView: string;
  children?: React.ReactNode;
}) {
  const [view, setView] = useState(initialView);
  const { windowHeight, windowWidth } = useWindowSize();
  const heightRef = useRef(windowHeight);
  const widthRef = useRef(windowWidth);
  const ActiveView = viewRegistry[view as ViewTag];
  const setCarDefault = useCarStore().setCarDefault;
  // if (!ActiveView) return null;

  useEffect(() => {
    let scalar: number = 1;
    scalar = windowHeight / heightRef.current;
    heightRef.current = windowHeight;
    widthRef.current = windowWidth;
    const move = useItemStore.getState().move;
    const items = useItemStore.getState().items;
    console.log(scalar, windowHeight, windowWidth);
    for (const item of items)
      move(item.id, { ...item, x: item.x * scalar, y: item.y * scalar });
  }, [windowHeight, windowWidth]);

  return (
    <div className={`${styles.screen}`}>
      <div
        className={`${styles.boundary}`}
        style={{
          height: windowHeight,
          width: windowWidth,
          containerType: "inline-size",
        }}
      >
        <ViewContext value={{ view, setView }}>
          {ActiveView ? <ActiveView /> : ""}
          {children}
          <ViewButtons />
          {view != "desk" && <Hotbar />}
        </ViewContext>
      </div>
      <button
        style={{ position: "fixed", left: "20px", top: "20px" }}
        onClick={() => setCarDefault()}
      >
        spawn new car
      </button>
    </div>
  );
}
