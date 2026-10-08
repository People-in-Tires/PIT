"use client";

import { Race, Point, Racer } from "@/lib/wasm/simulation";
import { pullRaceState } from "@/lib/race/actions";
import { useContext, useEffect, useRef, useState } from "react";
import { SimulationContext } from "@/context/simulation";
import MiniMapCar, { IMiniMapCar } from "./MiniMapCar";
import getAngle from "@/lib/libft/getangle";
import React from "react";

const SIMULATION_SCALE = 1;
const SVG_WIDTH = 1000;
const SVG_HEIGHT = 1000;

function simulationToSvg(point: Point): Point {
  return new Point(
    (point.x / SIMULATION_SCALE) * SVG_WIDTH,
    (point.y / SIMULATION_SCALE) * SVG_HEIGHT,
  );
}

export default function MiniMap() {
  const { ready } = useContext(SimulationContext);
  const svgRef = useRef<SVGSVGElement>(null);
  const [race, setRace] = useState<Race | null>(null);
  const [racers, setRacers] = useState<IMiniMapCar[]>();
  const [hovering, setHovering] = useState<number>(-1);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const raceState = await pullRaceState();
      if (ready && raceState.state != "" && !cancelled) {
        const temprace = Race.from_json(raceState.state);
        if (temprace) {
          setRace(temprace);
          setRacers(
            temprace.racers.map((value, index) => {
              const svgPoint = simulationToSvg(value.position);
              const t =
              Math.round(value.t * temprace.track_points.length) % temprace.track_points.length;
              const curPoint = simulationToSvg(temprace.track_points[t]);
              const postPoint = simulationToSvg(
                temprace.track_points[(t + 1) % temprace.track_points.length],
              );
              const car: IMiniMapCar = {
                position: { x: svgPoint.x, y: svgPoint.y },
                color: "red",
                rotation:
                  getAngle(curPoint.x, curPoint.y, postPoint.x, postPoint.y) + 90,
                onMouseEnter: () => {
                  setHovering(index);
                },
                onMouseLeave: () => {
                  setHovering(-1);
                },
                car_number: index + 1,
              };
              return car;
            }),
          );
        } else
          console.error(
            "race does not exist, this is likely due to a faulty value in the database",
          );
      }
    }
    load();
    const interval = setInterval(load, 1000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [ready, race, racers, setRacers]);

  if (!ready) {
    return <>loading...</>;
  }

  function trackPolyline() {
    if (!race) return;
    return race.track_points
      .map((p) => {
        const svgPoint = simulationToSvg(p);
        return `${svgPoint.x},${svgPoint.y}`;
      })
      .join(" ");
  }
  function racerInfo(racer: Racer, svgPoint: { x: number; y: number }) {
    return (
      <text x={svgPoint.x + 20} y={svgPoint.y} fill="white" stroke="white">
        <tspan x={svgPoint.x + 20} dy=".6em">
          {racer.driver.name}
        </tspan>
        <tspan x={svgPoint.x + 20} dy="1.2em">
          {(racer.t * 100).toFixed(3).replace(/(0*$)|(\.0*$)/, "")}%
        </tspan>
        <tspan x={svgPoint.x + 20} dy="1.2em">
          {(racer.speed * 1000).toFixed(3).replace(/(0*$)|(\.0*$)/, "")} kph
        </tspan>
        <tspan x={svgPoint.x + 20} dy="1.2em">
          {racer.car.chassis.fuel / 1000}/{racer.car.chassis.tenderness / 1000}l
          fuel
        </tspan>
      </text>
    );
  }

  return (
    <React.Fragment>
      <svg
        ref={svgRef}
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        style={{
          width: "100%",
          maxWidth: 1000,
          height: "auto",
          border: "1px solid #ccc",
          touchAction: "none",
          userSelect: "none",
        }}
      >
        {/* track */}
        <polyline
          points={trackPolyline()}
          fill="none"
          stroke="grey"
          strokeWidth={5}
        />
      </svg>
      {/* racers */}
      {race &&
        racers &&
        racers.map((value, index) => (
          <React.Fragment key={index}>
            <MiniMapCar {...value} />
            {hovering === index &&
              racerInfo(race.racers[index], value.position)}
          </React.Fragment>
        ))}
    </React.Fragment>
  );
}
