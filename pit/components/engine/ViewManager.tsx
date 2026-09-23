"use client";

import React, { createContext, useContext, useState } from "react";
import ViewButtons from "@/components/UI/ViewButtons";
import Garage from "@/components/views/Garage";
import Workbench from "@/components/views/Workbench";
import Desk from "@/components/views/Desk";
import ShaderCanvas from "@/components/shader/ShaderCanvas";
import drunkFrag from '@/components/shader/drunkFrag';
import exampleFrag from "@/components/shader/exampleFrag";

export type ViewTag = "garage" | "workbench" | "desk";

export const viewRegistry: Record<
  ViewTag,
  React.ComponentType<React.JSX.Element>
> = {
  garage: Garage,
  workbench: Workbench,
  desk: Desk,
};

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
  const ActiveView = viewRegistry[view as ViewTag];
  // if (!ActiveView) return null;

  return (
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
