"use client";

import "@/shared/registerViews";// side effects, must be under use client

import React, { createContext, useContext, useState } from "react";
import ViewButtons from "@/components/new/ViewButtons";
import { getView } from "@/shared/viewRegistry";

interface ViewContextType {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error("useView must be used within ViewManager");
  return ctx;
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