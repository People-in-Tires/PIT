"use client";

import { SimulationContext } from "@/context/simulation";
import { useContext, useState, Fragment, useRef } from "react";
import { IPoint, IRacerMeta } from "@/lib/race/actions";
import {
  EManufacturer,
  ESponsor,
  EWeather,
  Point,
  Race,
} from "@/lib/wasm/simulation";

const SVGHEIGHT = 1000;
const SVGWIDTH = 1000;
const SIMULATION_SCALE = 1;

function simulationToSvg(point: IPoint, height: number, width: number): IPoint {
  return {
    x: (point.x / SIMULATION_SCALE) * width,
    y: (point.y / SIMULATION_SCALE) * height,
  };
}

export default function RaceCreator({
  height = SVGHEIGHT,
  width = SVGWIDTH,
}: {
  height?: number;
  width?: number;
}) {
  const { ready } = useContext(SimulationContext);
  const [controlPoints, setControlPoints] = useState<IPoint[]>([
    { x: 0.1, y: 0.1 },
    { x: 0.5, y: 0.1 },
    { x: 0.9, y: 0.1 },
    { x: 0.9, y: 0.5 },
    { x: 0.9, y: 0.9 },
    { x: 0.5, y: 0.9 },
    { x: 0.1, y: 0.9 },
    { x: 0.1, y: 0.5 },
  ]);
  const [trackPoints, setTrackPoints] = useState<Point[]>([]);
  const [weather, setWeather] = useState<EWeather>(EWeather.Sunny);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [racerCount, setRacerCount] = useState<number>(24);
  const [racerIndex, setRacerIndex] = useState<number>(0);
  const [racers, setRacers] = useState<IRacerMeta[]>(
    new Array(24).fill({
      manufacturer: EManufacturer.Random,
      sponsor: ESponsor.Random,
      forename: "",
      surname: "",
      cpu: false,
    }),
  );
  const svgRef = useRef<SVGSVGElement>(null);

  if (!ready) {
    return <Fragment>loading...</Fragment>;
  }

  function getSvgPoint(event: React.PointerEvent<SVGSVGElement>): Point | null {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    return new Point(
      ((event.clientX - rect.left) / rect.width) * SIMULATION_SCALE,
      ((event.clientY - rect.top) / rect.height) * SIMULATION_SCALE,
    );
  }
  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    if (draggingIndex === null) return;
    const point = getSvgPoint(event);
    if (!point) return;

    setControlPoints((current) => {
      const next = [...current];
      next[draggingIndex] = new Point(
        Math.max(0, Math.min(SIMULATION_SCALE, point.x)),
        Math.max(0, Math.min(SIMULATION_SCALE, point.y)),
      );
      return next;
    });
    updateTrack();
  }
  function handlePointerUp() {
    setDraggingIndex(null);
  }
  function handlePointerDown(
    event: React.PointerEvent<SVGCircleElement>,
    index: number,
  ) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDraggingIndex(index);
  }
  function updateTrack() {
    if (controlPoints.length == 8) {
      const overlapPoints = [...controlPoints, ...controlPoints.slice(0, 3)];
      const points = overlapPoints.map((p) => new Point(p.x, p.y));
      setTrackPoints(Race.wrapping_control_points(points));
    }
  }
  function trackPolyline() {
    return trackPoints
      .map((p) => {
        const svgPoint = simulationToSvg(p, height, width);
        return `${svgPoint.x},${svgPoint.y}`;
      })
      .join(" ");
  }
  function updateRacerCount(count: number) {
    if (count < racerIndex) setRacerIndex(count);
    setRacerCount(count);
    const nextRacers = racers.slice();
    while (nextRacers.length < count) {
      nextRacers.push({
        manufacturer: EManufacturer.Random,
        sponsor: ESponsor.Random,
        forename: "",
        surname: "",
        cpu: true,
      });
    }
    while (nextRacers.length > count) {
      nextRacers.pop();
    }
    setRacers(nextRacers);
  }
  function updateRacerForename(name: string) {
    setRacers((racers) => {
      const next = racers.slice();
      next[racerIndex].forename = name;
      return next;
    });
  }
  function updateRacerSurname(name: string) {
    setRacers((racers) => {
      const next = racers.slice();
      next[racerIndex].surname = name;
      return next;
    });
  }
  function updateRacerSponsor(sponsor: string) {
    setRacers((racers) => {
      const next = racers.slice();
      next[racerIndex].sponsor = ESponsor[sponsor as keyof typeof ESponsor];
      return next;
    });
  }
  function updateRacerManufacturer(manufacturer: string) {
    setRacers((racers) => {
      const next = racers.slice();
      next[racerIndex].manufacturer =
        EManufacturer[manufacturer as keyof typeof EManufacturer];
      return next;
    });
  }

  return (
    <Fragment>
      debug info: <br />
      racerindex: {racerIndex} <br />
      racerCount: {racerCount} <br />
      racerSponsor: {racers[racerIndex].sponsor} <br />
      racerManufacturer: {racers[racerIndex].manufacturer} <br />
      <input
        id="racerCount"
        type="number"
        value={racerCount}
        min="0"
        max="48"
        onChange={(e) => updateRacerCount(Number(e.target.value))}
      />
      <select
        id="racerSelect"
        name="racerSelect"
        value={racerIndex}
        onChange={(e) => setRacerIndex(Number(e.target.value))}
      >
        {Array.from({ length: racerCount }, (_, i) => i).map((v) => (
          <option key={v} value={v}>
            {v + 1}
          </option>
        ))}
      </select>
      Racer information: <br />
      - name:
      <input
        id="racerForename"
        type="text"
        value={racers[racerIndex].forename}
        placeholder="leave empty to randomize"
        maxLength={64}
        onChange={(e) => updateRacerForename(e.target.value)}
      />
      <input
        id="racerSurname"
        type="text"
        value={racers[racerIndex].surname}
        placeholder="leave empty to randomize"
        maxLength={64}
        onChange={(e) => updateRacerSurname(e.target.value)}
      />
      <br />- sponsor:{" "}
      <select
        name="racerSponsor"
        id="racerSponsor"
        value={ESponsor[racers[racerIndex].sponsor]}
        onChange={(e) => updateRacerSponsor(e.target.value)}
      >
        {Object.keys(ESponsor)
          .filter((k) => !isFinite(+k))
          .map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
      </select>
      <br />- manufacturer:{" "}
      <select
        name="racerManufacturer"
        id="racerManufacturer"
        value={EManufacturer[racers[racerIndex].manufacturer]}
        onChange={(e) => updateRacerManufacturer(e.target.value)}
      >
        {Object.keys(EManufacturer)
          .filter((k) => !isFinite(+k))
          .map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
      </select>
      <br />
      <select
        name="weather"
        id="weather"
        value={EWeather[weather]}
        onChange={(e) =>
          setWeather(EWeather[e.target.value as keyof typeof EWeather])
        }
      >
        {Object.keys(EWeather)
          .filter((k) => !isFinite(+k))
          .map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
      </select>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: `${String(100)}%`,
          maxWidth: 1000,
          height: "auto",
          border: "1px solid #ccc",
          touchAction: "none",
          userSelect: "none",
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <polyline
          points={trackPolyline()}
          fill="none"
          stroke="grey"
          strokeWidth={5}
        />
        {controlPoints.map((point, index) => {
          const svgPoint = simulationToSvg(point, height, width);

          return (
            <circle
              key={index}
              cx={svgPoint.x}
              cy={svgPoint.y}
              r={10}
              fill="white"
              stroke="blue"
              strokeWidth={3}
              style={{
                cursor: draggingIndex === index ? "grabbing" : "grab",
              }}
              onPointerDown={(event) => handlePointerDown(event, index)}
            />
          );
        })}
      </svg>
    </Fragment>
  );
}
