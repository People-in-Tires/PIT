"use client";
import { createContext, useEffect, useState } from "react";
import init, { Weather } from "@/lib/wasm/simulation";
import type { ReactNode } from "react";
import { pullRaceState } from "@/lib/race/actions";
import { Race } from "@/lib/wasm/simulation";

export interface ISimulation {
  ready: boolean;
  weather: Weather;
}
const initial = { ready: false, weather: 0 };
export const SimulationContext = createContext<ISimulation>(initial);

export default function Simulation(props: SimulationContextProps) {
  const [ready, setReady] = useState(initial.ready);
  const [weather, setWeather] = useState<Weather>(initial.weather);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const raceState = await pullRaceState();
      if (ready && raceState.state != "" && !cancelled) {
        console.log(raceState.state);
        const race = Race.from_json(raceState.state);
        if (race) setWeather(race.weather);
      }
    }
    const interval = setInterval(load, 1000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [ready]);

  return (
    <SimulationContext value={{ ready: ready, weather: weather }}>
      {props.children}
    </SimulationContext>
  );
}

interface SimulationContextProps {
  children: ReactNode;
}
