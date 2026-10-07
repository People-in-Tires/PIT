import { Car, Race } from "@/lib/wasm/simulation";
import useCarStore from "../engine/carStore";
import { pushRaceState } from "@/lib/race/actions";
import { getCarSim } from "../engine/carStore";
import { Racer } from "@/lib/wasm/simulation";
import React, { useEffect, useRef } from "react";
import { pullRaceState } from "@/lib/race/actions";
import { useContext } from "react";
import { SimulationContext } from "@/context/simulation";
import { LobbyContext } from "@/context/lobby";
export default function RaceButtons({}) {
  const ready = useContext(SimulationContext);
  const raceRef = useRef<Race | undefined>(undefined);
  const { car_numbers } = useContext(LobbyContext);

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

  function call_racer(car_number: number) {
    if (raceRef.current) {
      const racers = raceRef.current.racers;
      racers[car_number - 1].should_pit = true;
      raceRef.current.set_racer(racers[car_number - 1], car_number - 1);
      pushRaceState(raceRef.current.to_json());
      console.log("come in", car_number);
    }
  }

  return (
    <div style={{position:"absolute"}}>
      <button onClick={() => call_racer(car_numbers[0])}>
        <img src={"bolt.png"} />
      </button>
      <button onClick={() => call_racer(car_numbers[1])}>
        <img src={"bolt.svg"} />
      </button>
      <button
        onClick={() => {
          const car: Car | undefined = getCarSim();
          if (car === undefined || raceRef.current === undefined) return;
          const car_num = car.number; //why???
          const racers = raceRef.current.racers;
          racers[car_num - 1].car = car;
          racers[car_num - 1].should_pit = false;
          racers[car_num - 1].in_pit = -1;
          raceRef.current.set_racer(racers[car_num - 1], car_num - 1);
          console.log("pushed", car);
          pushRaceState(raceRef.current.to_json());
          useCarStore.getState().resetCar();
        }}
      >
        <img src={"/beer.png"} />
      </button>
    </div>
  );
}
