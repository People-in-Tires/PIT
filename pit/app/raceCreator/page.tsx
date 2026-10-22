"use client";

import RaceCreator from "@/components/raceCreator/RaceCreator";
import Simulation from "@/context/simulation";
import { IRaceCreation } from "@/lib/race/actions";
import { EWeather } from "@/lib/wasm/simulation";
import { useState } from "react";

export default function Page() {
  const [raceData, setRaceData] = useState<IRaceCreation>({
    racers: [],
    track: [],
    weather: EWeather.Sunny,
  });
  console.log(raceData);
  return (
    <Simulation>
      <RaceCreator
        setRacerCreationData={setRaceData}
        height={window.innerHeight / 2}
        width={window.innerHeight / 2}
      />
    </Simulation>
  );
}
