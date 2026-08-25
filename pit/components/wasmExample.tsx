import { useContext } from "react";
import { SimulationContext } from "@/context/simulation";
import { Point } from "@/lib/wasm/simulation";

export const WASMExample = () => {
  const ctx = useContext(SimulationContext);
  if (!ctx) {
    return <>...</>;
  }
  const points: Point[] = [];
  for (let i = 0; i < 8; i++) {
    points[i] = new Point(1, 2);
  }
  for (const p of points.slice(0, 3)) points.push(p.clone());
  return (
    <>
      points:
      <ol>
        {points.map((p) => {
          return p.string();
        })}
      </ol>
    </>
  );
};
