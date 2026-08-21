import React, { createContext, useEffect, useState } from "react";
import init from "@/simulation/wasm_simulation";
import type { ReactNode } from "react";

const initial = false;

export const SimulationContext = createContext<boolean>(initial);

export function Simulation(props: SimulationContextProps) {
  const [ready, setReady] = useState(initial);

  useEffect(() => {
    init().then(() => {
      setReady(true);
    });
  }, []);

  return <SimulationContext value={ready}>{props.children}</SimulationContext>;
}

interface SimulationContextProps {
  children: ReactNode;
}
