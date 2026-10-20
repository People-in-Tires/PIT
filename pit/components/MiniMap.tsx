"use client";

import { Race, Point, Racer } from "@/lib/wasm/simulation";
import { useContext, useState } from "react";
import { SimulationContext } from "@/context/simulation";
import MiniMapCar from "./MiniMapCar";
import getAngle from "@/lib/libft/getangle";
import RacerInfo from "./UI/CarInfo";
import { LobbyContext } from "@/context/lobby";

const SVGHEIGHT = 1000;
const SIMULATION_SCALE = 1;

function simulationToSvg(point: Point, scale: number): Point {
  return new Point(
    (point.x / SIMULATION_SCALE) * scale,
    (point.y / SIMULATION_SCALE) * scale,
  );
}

function Track({ race, scale }: { race: Race; scale: number }) {
  function trackPolyline() {
    return race.track_points
      .map((p) => {
        const svgPoint = simulationToSvg(p, scale);
        return `${svgPoint.x},${svgPoint.y}`;
      })
      .join(" ");
  }

  return (
    <svg
      width={scale}
      height={scale}
      viewBox={`0 0 ${scale} ${scale}`}
      style={{
        width: "100%",
        maxWidth: 1000,
        height: "auto",
        border: "1px solid #ccc",
        touchAction: "none",
        userSelect: "none",
        position: "absolute",
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
  scale = SVGHEIGHT,
  hazardsOn = true,
  teamOnly = false,
}: {
  scale?: number;
  hazardsOn?: boolean;
  teamOnly?: boolean;
}) {
  const { ready, race } = useContext(SimulationContext);
  const { car_numbers } = useContext(LobbyContext);
  const [hovering, setHovering] = useState<number>(-1);
  if (!ready || !race) {
    return <>loading...</>;
  }
  return (
    <div
      style={{
        position: "absolute",
        height: `${scale}px`,
        width: `${scale}px`,
      }}
    >
      <Track race={race} scale={scale} />
      {hovering !== -1 && <RacerInfo racer={race.racers[hovering]} />}
      {race.racers &&
        race.racers.map((value, index) => {
          const svgPoint = simulationToSvg(value.position, scale);
          const normal = race.get_track_normal(value.t);
          if (teamOnly && !car_numbers.includes(index + 1)) return;
          return (
            <MiniMapCar
              key={index}
              position={{
                x:
                  svgPoint.x +
                  (value.in_pit != -1 ? normal.x * scale * 0.1 : 0),
                y:
                  svgPoint.y +
                  (value.in_pit != -1 ? normal.y * scale * 0.1 : 0),
              }}
              opacity={value.in_pit != -1 ? 50 : 100}
              color="red"
              rotation={getAngle(normal.x, normal.y, 0, 0)}
              onMouseEnter={() => setHovering(index)}
              onMouseLeave={() => setHovering(-1)}
              car_number={index + 1}
            />
          );
        })}
      {hazardsOn &&
        race.hazards &&
        race.hazards.map((value, index) => {
          if (value.location > 1.0 || value.location < 0.0) return;
          const svgPoint = simulationToSvg(
            race.get_track_position(value.location),
            scale,
          );
          return (
            <img
              key={index}
              src={"/ui/exit.svg"}
              style={{
                position: "absolute",
                left: svgPoint.x,
                top: svgPoint.y,
                height: "10%",
                aspectRatio: "1/1",
                transform: "translateX(-50%) translateY(-50%)",
              }}
            />
          );
        })}
    </div>
  );
}
