"use client";

import { SimulationContext } from "@/context/simulation";
import { Race, Point, Weather, Racer } from "@/lib/wasm/simulation";
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

export default function MiniMap() {
  const ready = useContext(SimulationContext);
  const [raceReady, setRaceReady] = useState<boolean>(false);
  const svgref = useRef<SVGSVGElement>(null);
  const [race, setRace] = useState<Race | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
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
    racer.driver.set_forename("Jimmy");
    racer.driver.set_surname("Beast");
    setRace(
      new Race(
        [racer],
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
  return (
    <div>
      there should be something here
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
            <ol>{messages}</ol>
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
        {/*race.racers.map((racer, index) => {
					const svgPoint = simulationToSvg(racer.position);

					return (
						<circle
							key={index}
							cx={svgPoint.x}
							cy={svgPoint.y}
							r={10}
							fill="white"
							stroke="blue"
							strokeWidth={3}
						/>
					)
				})*/}
      </svg>
    </div>
  );
}
