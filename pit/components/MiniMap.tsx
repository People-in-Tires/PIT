"use client";

import { Race, Point, Racer } from "@/lib/wasm/simulation";
import { useContext, useEffect, useState } from "react";
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

function RacerInfo({
  racer,
  svgPoint,
}: {
  racer: Racer;
  svgPoint: { x: number; y: number };
}) {
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

function Track({ race }: { race: Race }) {
  function trackPolyline() {
    return race.track_points
      .map((p) => {
        const svgPoint = simulationToSvg(p);
        return `${svgPoint.x},${svgPoint.y}`;
      })
      .join(" ");
  }

  return (
    <svg
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
  );
}

export default function MiniMap() {
  const { ready, race } = useContext(SimulationContext);
  const [racers, setRacers] = useState<IMiniMapCar[]>();
  const [hovering, setHovering] = useState<number>(-1);

  useEffect(() => {
    if (!race) return;
    setRacers(
      race.racers.map((value, index) => {
        const svgPoint = simulationToSvg(value.position);
        const t =
          Math.round(value.t * race.track_points.length) %
          race.track_points.length;
        const curPoint = simulationToSvg(race.track_points[t]);
        const postPoint = simulationToSvg(
          race.track_points[(t + 1) % race.track_points.length],
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
  }, [race]);
  if (!ready || !race) {
    return <>loading...</>;
  }
  return (
    <React.Fragment>
      {<Track race={race} />}
      {racers &&
        racers.map((value, index) => (
          <React.Fragment key={index}>
            <MiniMapCar {...value} />
            {hovering === index && (
              <RacerInfo racer={race.racers[index]} svgPoint={value.position} />
            )}
          </React.Fragment>
        ))}
    </React.Fragment>
  );
}
