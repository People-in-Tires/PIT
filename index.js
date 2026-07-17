// import + init wasm
import init, { greet, fibonacci, Point, Racer, step } from './pkg/wasm_simulation.js';
await init();

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
console.log("testing pointer lock")
document.addEventListener('click', function() {
	canvas.requestPointerLock();
});

function updatePosition(e) {
	const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
	const movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
	console.log(`Moved: (${movementX}, ${movementY})`);
	mkcircle(movementX + canvas.width / 2, movementY + canvas.height / 2, 1, "black");
}
function lockChangeAlert() {
	if (document.pointerLockElement === canvas) {
		console.log("the pointer is locked");
		document.addEventListener("mousemove", updatePosition, false);
	} else {
		console.log("the pointer is unlocked");
		document.removeEventListener("mousemove", updatePosition, false);
	}
}

console.log("pointer lock should be initialised")

document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('pointerlockerror', lockChangeAlert, false);

greet("cummies")
console.log("value of 10th fib number is", fibonacci(10))
console.log("point: ", new Point(1.2, 3.4))
let points = []
for (let i = 0; i < 5; i++) {
	points[i] = new Point(Math.random() * canvas.width, Math.random() * canvas.height)
}
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

console.log("array of twenty random points: ", points)
console.log("distances between all aforementioned points: ", distances)
console.log("drawing onto canvas to the best of my ability...")

ctx.beginPath();

ctx.moveTo((points[points.length - 1].x + points[0].x) / 2, (points[points.length - 1].y + points[0].y) / 2);
for (var i = 0; i < points.length - 2; i++) {
	let xc = (points[i].x + points[i + 1].x) / 2;
	let yc = (points[i].y + points[i + 1].y) / 2;
	ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
}

{
	{
		let xc = (points[i + 1].x + points[0].x) / 2;
		let yc = (points[i + 1].y + points[0].y) / 2;
		ctx.quadraticCurveTo(
			points[i + 1].x,
			points[i + 1].y,
			xc,
			yc
		);
	}
	// {
	// 	let xc = (points[0].x + points[1].x) / 2;
	// 	let yc = (points[0].y + points[1].y) / 2;
	// 	ctx.quadraticCurveTo(
	// 		points[0].x,
	// 		points[0].y,
	// 		xc,
	// 		yc
	// 	);
	// }
}
//
// ctx.quadraticCurveTo(points[i + 1].x, points[i + 1].y, points[0].x, points[0].y)

ctx.stroke();

let mkcircle = (x, y, r, color) => {
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.stroke()
}
mkcircle(points[0].x, points[0].y, 5, "green");
mkcircle(points[i + 1].x, points[i + 1].y, 5, "red");
points.map((p) => mkcircle(p.x, p.y, 2, "blue"))

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
