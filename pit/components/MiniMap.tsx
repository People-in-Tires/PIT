"use client";

import { SimulationContext } from "@/context/simulation";
import { Race, Point, Weather, Racer } from "@/lib/wasm/simulation";
import { useContext, useRef, useState } from "react";

const SIMULATION_SCALE = 1;
const SVG_WIDTH = 1000;
const SVG_HEIGHT = 1000;

function set_forename(racer: Racer, name: string): void {
  const driver = racer.driver;
  driver.set_forename(name);
  racer.driver = driver;
}
function set_surname(racer: Racer, name: string): void {
  const driver = racer.driver;
  driver.set_surname(name);
  racer.driver = driver;
}
function set_name(racer: Racer, forename: string, surname: string): void {
  set_forename(racer, forename);
  set_surname(racer, surname);
}

function simulationToSvg(point: Point): Point {
  return new Point(
    (point.x / SIMULATION_SCALE) * SVG_WIDTH,
    (point.y / SIMULATION_SCALE) * SVG_HEIGHT,
  );
}

export default function MiniMap() {
  const ready = useContext(SimulationContext);
  const [raceReady, setRaceReady] = useState<boolean>(false);
  const svgref = useRef<SVGSVGElement>(null);
  const [race, setRace] = useState<Race | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [hovering, setHovering] = useState<number>(-1);
  if (!ready) {
    return <div> ... </div>;
  }

  function init_race() {
    const initial_points: Point[] = [
      new Point(0.1, 0.1),
      new Point(0.5, 0.1),
      new Point(0.9, 0.1),
      new Point(0.9, 0.5),
      new Point(0.9, 0.9),
      new Point(0.5, 0.9),
      new Point(0.1, 0.9),
      new Point(0.1, 0.5),
    ];
    const racer: Racer = new Racer(0, 0);
    const racer2: Racer = new Racer(0, 0);
    set_name(racer, "Jimmothy", "Beast");
    set_name(racer2, "Chandler", "Breast");
    setRace(
      new Race(
        [racer, racer2],
        [
          ...initial_points,
          ...initial_points.slice(0, 3).map((p) => p.clone()),
        ],
        Weather.Sunny,
      ),
    );
    setRaceReady(true);
  }
  function triggerStep() {
    if (!raceReady || !race) return;
    race.step();
    console.log(race.to_json());
    console.log(race.messages);
    setMessages(race.messages);
    setRaceReady(true);
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
        <button
          className={"init_race_button"}
          onClick={init_race}
          disabled={!ready || !!race}
        >
          initialise race
        </button>
        <button
          className={"sim_button"}
          onClick={triggerStep}
          disabled={!ready || !race}
        >
          Step simulation forwards
        </button>
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
