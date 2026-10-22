"use client";

import { SimulationContext } from "@/context/simulation";
import { useContext, useState, Fragment, useRef } from "react";
import { IPoint, IRacerMeta, IRaceCreation } from "@/lib/race/actions";
import {
  EManufacturer,
  ESponsor,
  EWeather,
  Point,
  Race,
} from "@/lib/wasm/simulation";
import { InlineRacerVisualiser, RacerSetter } from "./racerVisualiser";

const SVGHEIGHT = 1000;
const SVGWIDTH = 1000;
const SIMULATION_SCALE = 1;

type RaceCreatorProps = {
  height?: number;
  width?: number;
  setRacerCreationData(data: IRaceCreation): void;
};

function simulationToSvg(point: IPoint, height: number, width: number): IPoint {
  return {
    x: (point.x / SIMULATION_SCALE) * width,
    y: (point.y / SIMULATION_SCALE) * height,
  };
}

export function defaultRaceCreationData(): IRaceCreation {
  return {
    track: [
      { x: 0.1, y: 0.1 },
      { x: 0.5, y: 0.1 },
      { x: 0.9, y: 0.1 },
      { x: 0.9, y: 0.5 },
      { x: 0.9, y: 0.9 },
      { x: 0.5, y: 0.9 },
      { x: 0.1, y: 0.9 },
      { x: 0.1, y: 0.5 },
    ],
    racers: new Array(24)
      .fill({
        manufacturer: EManufacturer.Horsch,
        sponsor: ESponsor.Bol,
        forename: "",
        surname: "",
        cpu: false,
      })
      .map(() => {
        return {
          manufacturer: EManufacturer.Random,
          sponsor: ESponsor.Random,
          forename: "",
          surname: "",
          cpu: true,
        };
      }),
    weather: EWeather.Sunny,
  };
}

export default function RaceCreator({
  height = SVGHEIGHT,
  width = SVGWIDTH,
  setRacerCreationData,
}: RaceCreatorProps) {
  const { ready } = useContext(SimulationContext);
  const [controlPoints, setControlPoints] = useState<IPoint[]>(
    defaultRaceCreationData().track,
  );
  const [trackPoints, setTrackPoints] = useState<Point[]>([]);
  const [weather, setWeather] = useState<EWeather>(
    defaultRaceCreationData().weather,
  );
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [racerCount, setRacerCount] = useState<number>(24);
  const [racerIndex, setRacerIndex] = useState<number>(0);
  const [racers, setRacers] = useState<IRacerMeta[]>(
    defaultRaceCreationData().racers,
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
    if (count < 3) count = 3;
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
  function publishRaceCreation() {
    setRacerCreationData({
      racers: racers,
      track: controlPoints,
      weather: weather,
    });
  }

  const racerCountInput = (
    <input
      id="racerCount"
      type="number"
      value={racerCount}
      min="3"
      max="48"
      onChange={(e) => updateRacerCount(Number(e.target.value))}
      style={{
        width: "fit-content",
      }}
    />
  );
  const racerSelect = (
    <select
      id="racerSelect"
      name="racerSelect"
      value={racerIndex}
      onChange={(e) => setRacerIndex(Number(e.target.value))}
      style={{
        width: "fit-content",
      }}
    >
      {Array.from({ length: racerCount }, (_, i) => i).map((v) => (
        <option key={v} value={v}>
          {v + 1}:{" "}
          <InlineRacerVisualiser
            racers={racers}
            index={v}
            setRacers={() => {}}
          />
        </option>
      ))}
    </select>
  );
  const weatherSelect = (
    <select
      name="weather"
      id="weather"
      value={EWeather[weather]}
      onChange={(e) =>
        setWeather(EWeather[e.target.value as keyof typeof EWeather])
      }
      style={{
        width: "fit-content",
      }}
    >
      {Object.keys(EWeather)
        .filter((k) => !isFinite(+k))
        .map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
    </select>
  );
  const controlPointElements = controlPoints.map((point, index) => {
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
  });
  const polyline = (
    <polyline
      points={trackPolyline()}
      fill="none"
      stroke="grey"
      strokeWidth={5}
    />
  );

  return (
    <Fragment>
      <section id="raceSettings">
        <button onClick={publishRaceCreation}>finalize race</button>
        <h2>racer count </h2>
        {racerCountInput}
        <h2>edit specific racer </h2>
        {racerSelect}
        <br />
        <RacerSetter racers={racers} index={racerIndex} setRacers={setRacers} />
        <h2> weather </h2>
        {weatherSelect}
      </section>
      <section id="raceSettings">
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
          {polyline}
          {controlPointElements}
        </svg>
      </section>
    </Fragment>
  );
}
