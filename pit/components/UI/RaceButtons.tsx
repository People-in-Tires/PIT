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
  const raceRef = useRef<Race | undefined>(undefined)
  const car_number = 1

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const raceState = await pullRaceState();
      if (ready && raceState.state != "" && !cancelled) {
        const race = Race.from_json(raceState.state);
        if (race) raceRef.current = race 
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
      onClick={in_stop != undefined ? () => {
        if (raceRef.current == undefined) return ;
        const car: Car | undefined = getCarSim();
        if (car == undefined) return ;
          const racers = raceRef.current.racers;
          racers.forEach((value, index)=>{if (index === car_number - 1) value.car = car});
          racers.forEach((value, index)=>{if (index === car_number - 1) raceRef.current?.set_racer(value,index)});
          pushRaceState(raceRef.current.to_json())
        console.log("pushed", car)
      } : () => {
        if (raceRef.current) {
          const racers = raceRef.current.racers;
          racers.forEach((value, index)=>{if (index === car_number - 1) value.should_pit = true})
          racers.forEach((value, index)=>{if (index === car_number - 1) raceRef.current?.set_racer(value,index)})
          pushRaceState(raceRef.current.to_json())
          console.log("come in", car_number)
      }}}
    >
      <img src={"/beer.png"}/>
    </button>
  );
}
