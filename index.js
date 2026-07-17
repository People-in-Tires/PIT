// import + init wasm
import init, { greet, fibonacci, Point, Racer, step, wrapping_control_points } from './pkg/wasm_simulation.js';
await init();

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

greet("cummies")
console.log("value of 10th fib number is", fibonacci(10))
console.log("point: ", new Point(1.2, 3.4))
let points = []
for (let i = 0; i < 8; i++) {
	points[i] = new Point(Math.random() * canvas.width, Math.random() * canvas.height)
}

points.push(points[0].clone())
points.push(points[1].clone())
points.push(points[2].clone())
let distances = [[]]
for (let i = 0; i < points.length; i++) {
	let p = points[i];
	let p_dist = []
	for (let i = 0; i < points.length; i++) {
		let q = points[i];
		p_dist[i] = p.distance(q)
	}
	distances[i] = p_dist;
}

console.log("array of ", points.length, " random points: ", points)
console.log("distances between all aforementioned points: ", distances)
console.log("drawing onto canvas to the best of my ability...")

ctx.beginPath();

{
	const ps = points.map((p) => p.clone())
	const points_on_spline = wrapping_control_points(ps)
	for (let i = 0; i < points_on_spline.length; i++) {
		ctx.lineTo(points_on_spline[i].x, points_on_spline[i].y)
	}
}

ctx.stroke();

let racers = []
for (let i = 0; i < 5; i++) {
	racers[i] = new Racer(Math.random(), ((Math.random() * 2) - 1) / 10)
}

console.log("initial position of the racers: ")
for (let i = 0; i < racers.length; i++) {
	console.log("t: ", racers[i].t, ", offset: ", racers[i].offset)
}
console.log("stepping...")
racers = step(racers, points)
console.log("subsequent position of racers: ")
for (let i = 0; i < racers.length; i++) {
	console.log("t: ", racers[i].t, ", offset: ", racers[i].offset)
}
