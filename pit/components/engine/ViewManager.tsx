"use client";

import React, { createContext, useContext, useState } from "react";
import ViewButtons from "@/components/UI/ViewButtons";
import Garage from "../views/Garage";
import Workbench from "../views/Workbench";
import Desk from "../views/Desk";
import Storage from "../views/Storage";
import Hotbar from "../UI/Hotbar";
import styles from "@/css/Game.module.css";
import useWindowSize from "./useWindowSize";

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
  let { height, width } = useWindowSize();
  const ActiveView = viewRegistry[view as ViewTag];
  // if (!ActiveView) return null;

  if ((height * 16) / 9 > width) width = (height * 16) / 9;
  else height = (width * 9) / 16;
  return (
    <div
      className={`${styles.boundary}`}
      style={{ height: height, width: width }}
    >
      <ViewContext value={{ view, setView }}>
        {ActiveView ? <ActiveView /> : ""}
        {children}
        <ViewButtons />
        {view != "desk" && <Hotbar />}
      </ViewContext>
    </div>
  );
}
