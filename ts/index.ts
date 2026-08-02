// import + init wasm
import init, {
  greet,
  Point,
  Racer,
  step,
  wrapping_control_points,
} from "../pkg/wasm_simulation.js";

await init();

const canvas = document.querySelector("canvas");
if (canvas == null) {
  throw new Error("canvas dont exist");
}
const ctx = canvas.getContext("2d");
if (ctx == null) {
  throw new Error("context doesnt exist");
}

greet("cummies");
console.log("point: ", new Point(1.2, 3.4));
const points: Point[] = [];
for (let i = 0; i < 8; i++) {
  points[i] = new Point(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
  );
  if (points[i] === undefined) {
    throw new Error("Point could not be created");
  }
}

for (const p of points.slice(0, 3)) points.push(p.clone());
const distances: number[][] = [[]];
for (const p of points) {
  const p_dist: number[] = [];
  for (const q of points) {
    p_dist.push(p.distance(q));
  }
  distances.push(p_dist);
}

console.log("array of ", points.length, " random points: ", points);
console.log("distances between all aforementioned points: ", distances);
console.log("drawing onto canvas to the best of my ability...");

ctx.beginPath();

{
  const ps: Point[] = points.map((p) => p.clone());
  const points_on_spline: Point[] = wrapping_control_points(ps);
  for (const p of points_on_spline) {
    ctx.lineTo(p.x, p.y);
  }
}

ctx.stroke();

let racers: Racer[] = [];
for (let i = 0; i < 5; i++) {
  racers[i] = new Racer(Math.random(), (Math.random() * 2 - 1) / 10);
}

console.log("initial position of the racers: ");
for (const r of racers) {
  console.log("t: ", r.t, ", offset: ", r.offset);
}
console.log("stepping...");
racers = step(racers, points);
console.log("subsequent position of racers: ");
for (const r of racers) {
  console.log("t: ", r.t, ", offset: ", r.offset);
}
