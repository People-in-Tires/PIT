"use client";

import { Race, Point, Racer } from "@/lib/wasm/simulation";
import { getRaceState, pushRaceState } from "./actions";
import { useContext, useEffect, useState } from "react";
import { SimulationContext } from "@/context/simulation";

const SIMULATION_SCALE = 1;
const SVG_WIDTH = 1000;
const SVG_HEIGHT = 1000;

function simulationToSvg(point: Point): Point {
  return new Point(
    (point.x / SIMULATION_SCALE) * SVG_WIDTH,
    (point.y / SIMULATION_SCALE) * SVG_HEIGHT,
  );
}

export default function RaceProvider() {
  const ready = useContext(SimulationContext);
  const [race, setRace] = useState<Race | null>(null);
  const [timestamp, setTimestamp] = useState<Date>(new Date(0));
  useEffect(() => {
    let cancelled = false;

    async function load() {
      const raceState = await getRaceState();
      if (ready && raceState.state != "" && !cancelled) {
        console.log(raceState.state);
        setTimestamp(raceState.timestamp);
        const race = Race.from_json(raceState.state);
        if (race) setRace(race);
      }
    }
    load();
    const interval = setInterval(load, 1000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [ready]);

  if (!ready) {
    return <>loading...</>;
  }
  return (
    <>
      last updated at {timestamp.toISOString()}
      <br />
      announcer messages:
      <br />
      <ol>
        {race &&
          race.messages.map((msg, index) => {
            return <li key={index}>{msg}</li>;
          })}
      </ol>
    </>
  );
}
