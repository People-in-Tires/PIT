"use client";

import { Race, Point, Racer } from "@/lib/wasm/simulation";
import { getRaceState } from "@/lib/race/actions";
import { useContext, useEffect, useRef, useState } from "react";
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

export default function MiniMap() {
  const ready = useContext(SimulationContext);
  const svgRef = useRef<SVGSVGElement>(null);
  const [race, setRace] = useState<Race | null>(null);
  const [hovering, setHovering] = useState<number>(-1);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const raceState = await getRaceState();
      if (ready && raceState.state != "" && !cancelled) {
        console.log(raceState.state);
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

  function trackPolyline() {
    if (!race) return;
    return race.track_points
      .map((p) => {
        const svgPoint = simulationToSvg(p);
        return `${svgPoint.x},${svgPoint.y}`;
      })
      .join(" ");
  }
  function racerInfo(racer: Racer, svgPoint: Point) {
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
      {/* racers */}
      {race &&
        race.racers.map((racer, index) => {
          const svgPoint = simulationToSvg(racer.position);

          return (
            <a key={index}>
              <circle
                key={index}
                cx={svgPoint.x}
                cy={svgPoint.y}
                r={10}
                fill="white"
                stroke="blue"
                strokeWidth={3}
                onMouseEnter={() => {
                  setHovering(index);
                }}
                onMouseLeave={() => {
                  setHovering(-1);
                }}
              />
              {hovering == index && racerInfo(racer, svgPoint)}
            </a>
          );
        })}
    </svg>
  );
}
