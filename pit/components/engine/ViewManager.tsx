"use client";

import styles from "@/css/Game.module.css";

import React, { createContext, useContext, useState } from "react";
import ViewButtons from "@/components/UI/ViewButtons";
import Hotbar from "../UI/Hotbar";
import Garage from "@/components/views/Garage";
import Workbench from "@/components/views/Workbench";
import Desk from "@/components/views/Desk";
import Storage from "@/components/views/Storage";
import ShaderCanvas from "@/components/shader/ShaderCanvas";
import exampleFrag from "@/components/shader/exampleFrag";

export type ViewTag = "garage" | "workbench" | "storage" | "desk";

export const viewRegistry: Record<
  ViewTag,
  React.ComponentType<React.JSX.Element>
> = {
  garage: Garage,
  workbench: Workbench,
  storage: Storage,
  desk: Desk,
};

interface ViewContextType {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function useView() {
  const context = useContext(ViewContext);
  if (!context) throw new Error("useView must be used within ViewManager context");
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
  const ActiveView = viewRegistry[view as ViewTag];
  // if (!ActiveView) return null;

  return (
    <div className={styles.boundary}>
      <ViewContext value={{ view, setView }}>
        {ActiveView ? <ActiveView /> : ""}
        {children}
        <ViewButtons />
        {view != "desk" && <Hotbar />}
      </ViewContext>
    </div>
    <ViewContext value={{ view, setView }}>
      {ActiveView ? <ActiveView /> : ""}
      {children}
      <ViewButtons />
      <ShaderCanvas
        fragSource={exampleFrag}
        // style={{ mixBlendMode: 'screen' }}
      />
    </ViewContext>
  );
}
