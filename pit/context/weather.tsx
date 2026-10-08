import { EWeather } from "@/lib/wasm/simulation";
import { useContext, createContext } from "react";
import { SimulationContext } from "./simulation";
import { useEffect } from "react";
import { pullRaceState } from "@/lib/race/actions";
import { Race } from "@/lib/wasm/simulation";
import useCarStore from "@/components/engine/carStore";

import { useState } from "react";
const initial = 0;
export const WeatherContext = createContext<EWeather>(initial);

export default function WeatherCon({ children }: React.PropsWithChildren) {
  const { ready } = useContext(SimulationContext);
  const [weather, setWeather] = useState(initial);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const raceState = await pullRaceState();
      if (ready && raceState.state != "" && !cancelled) {
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
  return <WeatherContext value={weather}>{children}</WeatherContext>;
}
