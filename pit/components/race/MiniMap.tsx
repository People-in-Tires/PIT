"use client";

import { SimulationContext } from "@/context/simulation";
import { Race, Point, Racer } from "@/lib/wasm/simulation";
import { useContext, useRef, useState } from "react";

const SIMULATION_SCALE = 1;
const SVG_WIDTH = 1000;
const SVG_HEIGHT = 1000;

function simulationToSvg(point: Point): Point {
  return new Point(
    (point.x / SIMULATION_SCALE) * SVG_WIDTH,
    (point.y / SIMULATION_SCALE) * SVG_HEIGHT,
  );
}

export default function MiniMap({
  state,
}: {
  state: { timestamp: Date; state: string };
}) {
  const ready = useContext(SimulationContext);
  const svgref = useRef<SVGSVGElement>(null);
  // const [raceJson, setRaceJson] = useState(state);
  const [race, setRace] = useState<Race | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [hovering, setHovering] = useState<number>(-1);
  if (!ready) {
    return <div> ... </div>;
  }

  function setRaceState(state: { timestamp: Date; state: string }) {
    if (!state.state) return;
    const race = Race.from_json(state.state.toString());
    if (!race) return;
    setRace(race);
  }
  function updateMessages() {
    if (!race) return;
    setMessages(race.messages);
  }
  setRaceState(state);
  updateMessages();

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
          {racer.driver.name}:
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
    <div>
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {messages.length > 0 && (
          <div>
            messages:
            <ol>
              {messages.map((msg, index) => {
                return <li key={index}>{msg}</li>;
              })}
            </ol>
          </div>
        )}
      </div>
      <svg
        ref={svgref}
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
                ></circle>
                {hovering == index && racerInfo(racer, svgPoint)}
              </a>
            );
          })}
      </svg>
    </div>
  );
}
