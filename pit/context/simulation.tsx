"use client";
import { createContext, useEffect, useState } from "react";
import init, { EWeather } from "@/lib/wasm/simulation";
import type { ReactNode } from "react";
import { pullRaceState } from "@/lib/race/actions";
import { Race } from "@/lib/wasm/simulation";

export interface ISimulation {
  ready: boolean;
  weather: EWeather;
  race: Race | undefined;
}
const initial = { ready: false, weather: 0, race: undefined };
export const SimulationContext = createContext<ISimulation>(initial);

export default function Simulation(props: SimulationContextProps) {
  const [ready, setReady] = useState(initial.ready);
  const [weather, setWeather] = useState<EWeather>(initial.weather);
  const [race, setRace] = useState<Race | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const raceState = await pullRaceState();
      if (ready && raceState.state != "" && !cancelled) {
        const race = Race.from_json(raceState.state);
        if (race) {
          setWeather(race.weather);
          setRace(race);
        }
      }
    }
    const interval = setInterval(load, 1000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [ready]);

  useEffect(() => {
    init().then(() => {
      setReady(true);
    });
  }, []);

  return (
    <SimulationContext value={{ ready: ready, weather: weather, race: race }}>
      {props.children}
    </SimulationContext>
  );
}

interface SimulationContextProps {
  children: ReactNode;
}
