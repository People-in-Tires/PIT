"use client";

import "@/app/css/map-editor.css";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SimulationContext } from "@/context/simulation";
import { Race } from "@/lib/wasm/wasm_simulation";

type Point = {
  x: number;
  y: number;
};

const INITIAL_POINTS: Point[] = [
  { x: 0.1, y: 0.1 },
  { x: 0.5, y: 0.1 },
  { x: 0.9, y: 0.1 },
  { x: 0.9, y: 0.5 },
  { x: 0.9, y: 0.9 },
  { x: 0.5, y: 0.9 },
  { x: 0.1, y: 0.9 },
  { x: 0.1, y: 0.5 },
];

const SIMULATION_SCALE = 1;
const SVG_WIDTH = 1000;
const SVG_HEIGHT = 1000;

function simulationToSvg(point: Point): Point {
  return {
    x: (point.x / SIMULATION_SCALE) * SVG_WIDTH,
    y: (point.y / SIMULATION_SCALE) * SVG_HEIGHT,
  };
}

function saveJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

export default function MapEditor() {
  const [controlPoints, setControlPoints] = useState<Point[]>(INITIAL_POINTS);

  const [track, setTrack] = useState<Point[]>([]);

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  const ready = useContext(SimulationContext);

  useEffect(() => {
    if (!ready) {
      return;
    }

    const overlapPoints = [...controlPoints, ...controlPoints.slice(0, 3)];

    const overlapPointsF64 = new Float64Array(
      overlapPoints.flatMap((p) => [p.x, p.y]),
    );

    const result = Race.generate_track_f64(overlapPointsF64);

    const trackPoints: Point[] = [];
    for (let i = 0; i < result.length; i += 2) {
      trackPoints.push({
        x: result[i],
        y: result[i + 1],
      });
    }

    setTrack(trackPoints);
  }, [controlPoints, ready]);

  if (!ready) return;

  function getSvgPoint(event: React.PointerEvent<SVGSVGElement>): Point | null {
    const svg = svgRef.current;

    if (!svg) {
      return null;
    }

    const rect = svg.getBoundingClientRect();

    return {
      x: ((event.clientX - rect.left) / rect.width) * SIMULATION_SCALE,
      y: ((event.clientY - rect.top) / rect.height) * SIMULATION_SCALE,
    };
  }

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    if (draggingIndex === null) {
      return;
    }

    const point = getSvgPoint(event);

    if (!point) {
      return;
    }

    setControlPoints((current) => {
      const next = [...current];

      next[draggingIndex] = {
        x: Math.max(0, Math.min(SIMULATION_SCALE, point.x)),
        y: Math.max(0, Math.min(SIMULATION_SCALE, point.y)),
      };

      return next;
    });
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

  function saveControlPoints() {
    saveJson("control-points.json", controlPoints);
  }

  function saveTrack() {
    saveJson("track.json", track);
  }

  /*
   * SVG format: "100,100 101,102 102,104 ..."
   */
  const trackPolyline = () => {
    return track
      .map((point) => {
        const svgPoint = simulationToSvg(point);
        return `${svgPoint.x},${svgPoint.y}`;
      })
      .join(" ");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <button onClick={saveControlPoints} disabled={!ready}>
          Export Control Points
        </button>

        <button onClick={saveTrack} disabled={!ready || track.length === 0}>
          Export Full Track (2500 points)
        </button>
      </div>

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
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Generated 2500-point track */}
        <polyline
          points={trackPolyline()}
          fill="none"
          stroke="grey"
          strokeWidth={5}
        />

        {/* Control points */}
        {controlPoints.map((point, index) => {
          const svgPoint = simulationToSvg(point);

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
    </div>
  );
}
