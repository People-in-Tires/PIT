"use client";

import "@/components/engine/registerViews"; // side effects, must be under use client

import React, { createContext, useContext, useState } from "react";
import ViewButtons from "@/components/UI/ViewButtons";
import { getView } from "@/components/engine/viewRegistry";

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
  const ActiveView = getView(view);

  return (
    <ViewContext value={{ view, setView }}>
      {ActiveView ? <ActiveView /> : <div>Unknown view: {view}</div>}
      {children}
      <ViewButtons />
    </ViewContext>
  );
}
