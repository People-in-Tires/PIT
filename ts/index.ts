// import + init wasm
import init, { greet, Point, Racer, Race } from "../pkg/wasm_simulation.js";

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

function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  fill: string,
  stroke: string,
  strokeWidth: number,
) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
}

const draw_pos = (p: Point, color: string) => {
  drawCircle(ctx, p.x, p.y, 5, "", color, 3);
};

const racers: Racer[] = [];
for (let i = 0; i < 1; i++) {
  racers[i] = new Racer(Math.random(), Math.random() * 2 - 1);
}
const race = new Race(racers, points);
ctx.beginPath();

{
  const points_on_spline: Point[] = race.track_points;
  for (const p of points_on_spline) {
    ctx.lineTo(p.x, p.y);
  }
}

ctx.stroke();

console.log("initial position of the racers: ");
for (const r of race.racers) {
  console.log(
    "t: ",
    r.t,
    ", offset: ",
    r.offset,
    ", cartesian position: ",
    r.position.string(),
  );
  draw_pos(r.position, "green");
}
console.log("stepping...");
race.step();
console.log("subsequent position of racers: ");
for (const r of race.racers) {
  console.log(
    "t: ",
    r.t,
    ", offset: ",
    r.offset,
    ", cartesian position: ",
    r.position.string(),
  );
  draw_pos(r.position, "blue");
}
