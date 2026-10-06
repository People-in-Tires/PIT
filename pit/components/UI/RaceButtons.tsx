import { Car, Race } from "@/lib/wasm/simulation";
import useCarStore from "../engine/carStore";
import { pushRaceState } from "@/lib/race/actions";
import { getCarSim } from "../engine/carStore";
import { Racer } from "@/lib/wasm/simulation";
import { useEffect } from "react";
import { pullRaceState } from "@/lib/race/actions";
import { useContext } from "react";
import { SimulationContext } from "@/context/simulation";
export default function RaceButtons({}) {
  const in_stop = useCarStore().in_stop;
  const ready = useContext(SimulationContext);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const raceState = await pullRaceState();
      if (ready && raceState.state != "" && !cancelled) {
        console.log(raceState.state);
        const race = Race.from_json(raceState.state);
        if (race) {
        }
      }
    }
    const interval = setInterval(load, 1000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [ready]);

  return (
    <button
      onClick={() => {
        const car: Car | undefined = getCarSim();
        const state = car?.to_json();
        pushRaceState(state);
      }}
    ></button>
  );
}
