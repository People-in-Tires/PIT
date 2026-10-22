"use client";

import { Race, Point, Racer } from "@/lib/wasm/simulation";
import { useContext, useState } from "react";
import { SimulationContext } from "@/context/simulation";
import MiniMapCar from "./MiniMapCar";
import getAngle from "@/lib/libft/getangle";
import React from "react";

const SVGHEIGHT = 1000;
const SVGWIDTH = 1000;
const SIMULATION_SCALE = 1;

function simulationToSvg(point: Point, height: number, width: number): Point {
  return new Point(
    (point.x / SIMULATION_SCALE) * width,
    (point.y / SIMULATION_SCALE) * height,
  );
}

function RacerInfo({
  racer,
}: {
  racer: Racer;
  svgPoint: { x: number; y: number };
}) {
  return (
    <div>
      {racer.driver.name}
      {(racer.t * 100).toFixed(3).replace(/(0*$)|(\.0*$)/, "")}%
      {(racer.speed * 1000).toFixed(3).replace(/(0*$)|(\.0*$)/, "")}kph
      {racer.car.chassis.fuel / 1000}/{racer.car.chassis.tenderness / 1000}l
      fuel
    </div>
  );
}

function Track({
  race,
  height,
  width,
}: {
  race: Race;
  height: number;
  width: number;
}) {
  function trackPolyline() {
    return race.track_points
      .map((p) => {
        const svgPoint = simulationToSvg(p, height, width);
        return `${svgPoint.x},${svgPoint.y}`;
      })
      .join(" ");
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
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
        stroke="black"
        strokeWidth={20}
      />
    </svg>
  );
}

export default function MiniMap({
  height = SVGHEIGHT,
  width = SVGWIDTH,
}: {
  height?: number;
  width?: number;
}) {
  const { ready, race } = useContext(SimulationContext);
  const [hovering, setHovering] = useState<number>(-1);

  console.log("ready => ", ready, ", race => ", race);
  if (!ready || !race) {
    return <>loading...</>;
  }
  return (
    <React.Fragment>
      <Track race={race} height={height} width={width} />
      {hovering !== -1 && (
        <RacerInfo
          racer={race.racers[hovering]}
          svgPoint={race.racers[hovering].position}
        />
      )}
      {race.racers &&
        race.racers.map((value, index) => {
          const svgPoint = simulationToSvg(value.position, height, width);
          const normal = race.get_track_normal(value.t);
          return (
            <MiniMapCar
              key={index}
              position={{
                x:
                  svgPoint.x +
                  (value.in_pit != -1 ? normal.x * width * 0.1 : 0),
                y:
                  svgPoint.y +
                  (value.in_pit != -1 ? normal.y * height * 0.1 : 0),
              }}
              opacity={value.in_pit != -1 ? 50 : 100}
              color="red"
              rotation={getAngle(0, 0, normal.x, normal.y)}
              onMouseEnter={() => {
                setHovering(index);
              }}
              onMouseLeave={() => {
                setHovering(-1);
              }}
              car_number={index + 1}
            />
          );
        })}
    </React.Fragment>
  );
}
