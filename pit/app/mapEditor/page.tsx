"use client";

import "../css/map-editor.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import init, { Point, wrapping_control_points } from "../../lib/wasm/wasm_simulation";
// TODO: use wasm context, not separate instance.

type simplePoint = {
  x: number;
  y: number;
};

const INITIAL_POINTS: simplePoint[] = [
  { x: .1, y: .1 },
  { x: .5, y: .1 },
  { x: .9, y: .1 },
  { x: .9, y: .5 },
  { x: .9, y: .9 },
  { x: .5, y: .9 },
  { x: .1, y: .9 },
  { x: .1, y: .5 },
];

const SIMULATION_SCALE = 1;
const SVG_WIDTH = 1000;
const SVG_HEIGHT = 1000;

function simulationToSvg(point: simplePoint): simplePoint {
  return {
    x: (point.x / SIMULATION_SCALE) * SVG_WIDTH,
    y: (point.y / SIMULATION_SCALE) * SVG_HEIGHT,
  };
}

function saveJson(filename: string, data: unknown) {
  const blob = new Blob(
    [JSON.stringify(data)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

export default function MapEditor() {
  const [frametime, setFrametime] = useState(new Date().getTime());
  const [ready, setReady] = useState(false);

  /*
   * Initialize WASM once; no dependencies
   * TODO: use context instead
   */
  useEffect(() => {
    init().then(() => {
      setReady(true);
    });
  }, []);

  const [controlPoints, setControlPoints] =
    useState<simplePoint[]>(INITIAL_POINTS);

  const [track, setTrack] = useState<Point[]>([]);

  const [draggingIndex, setDraggingIndex] =
    useState<number | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  /*
   * Generate the track whenever dependency 'controlPoints' changes
   */
  useEffect(() => {
    if (!ready) {
      return;
    }

    const overlapPoints = [
      ...controlPoints,
      ...controlPoints.slice(0, 3),
    ].map(p => new Point(p.x, p.y));

    const result = wrapping_control_points(overlapPoints);

    overlapPoints.map(p => p.free);

    setTrack(result);
    setFrametime(new Date().getTime());
  }, [controlPoints, ready]);

  /*
   * Convert a pointer position into SVG coordinates.
   */
  function getSvgPoint(
    event: React.PointerEvent<SVGSVGElement>
  ): simplePoint | null {
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

  function handlePointerMove(
    event: React.PointerEvent<SVGSVGElement>
  ) {
    if (draggingIndex === null) {
      return;
    }

    const point = getSvgPoint(event);

    if (!point) {
      return;
    }

    setControlPoints(current => {
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
    index: number
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
  const trackPolyline = useMemo(() => {
    return track
      .map(point => {
        const svgPoint = simulationToSvg(point);
        return `${svgPoint.x},${svgPoint.y}`;
      })
      .join(" ");
  }, [track]);

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
          onClick={saveControlPoints}
          disabled={!ready}
        >
          Export Control Points
        </button>

        <button
          onClick={saveTrack}
          disabled={!ready || track.length === 0}
        >
          Export Full Track (2500 points)
        </button>
      </div>
      <div>
        frametime: {new Date().getTime() - frametime}ms
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
          points={trackPolyline}
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
                cursor:
                  draggingIndex === index
                    ? "grabbing"
                    : "grab",
              }}
              onPointerDown={event =>
                handlePointerDown(event, index)
              }
            />
          );
        })}
      </svg>
    </div>
  );
}
