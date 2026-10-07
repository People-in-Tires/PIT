import { Car, Race } from "@/lib/wasm/simulation";
import useCarStore from "../engine/carStore";
import { pushRaceState } from "@/lib/race/actions";
import { getCarSim } from "../engine/carStore";
import { Racer } from "@/lib/wasm/simulation";
import { useEffect, useRef } from "react";
import { pullRaceState } from "@/lib/race/actions";
import { useContext } from "react";
import { SimulationContext } from "@/context/simulation";
export default function RaceButtons({}) {
  const in_stop = useCarStore().in_stop;
  const ready = useContext(SimulationContext);
  const raceRef = useRef<Race | undefined>(undefined);
  const car_number = 1;

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const raceState = await pullRaceState();
      if (ready && raceState.state != "" && !cancelled) {
        const race = Race.from_json(raceState.state);
        if (race) raceRef.current = race;
      }
    }
    const interval = setInterval(load, 1000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [ready]);

  useEffect(()=>{})

  return (
    <button
      onClick={
        in_stop != undefined
          ? () => {
              const car: Car | undefined = getCarSim();
              if (car == undefined || raceRef.current == undefined) return;
              const racers = raceRef.current.racers;
              racers[car_number -1].car = car;
              racers[car_number -1].should_pit = false;
              racers[car_number -1].in_pit = -1;
              raceRef.current.set_racer(racers[car_number -1], car_number -1)
              pushRaceState(raceRef.current.to_json());
              useCarStore.getState().resetCar();
              console.log("pushed", car);
            }
          : () => {
              if (raceRef.current) {
                const racers = raceRef.current.racers;
                racers[car_number -1].should_pit = true;
                raceRef.current.set_racer(racers[car_number -1], car_number -1)
                pushRaceState(raceRef.current.to_json());
                console.log("come in", car_number);
              }
            }
      }
    >
      <img src={"/beer.png"} />
    </button>
  );
}
