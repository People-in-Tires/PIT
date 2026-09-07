export default function getAngle(
  origin_x: number,
  origin_y: number,
  destination_x: number,
  destination_y: number,
) {
  const newx = origin_x - destination_x;
  const newy = destination_y - origin_y;
  let theta = Math.atan2(-newy, newx);
  if (theta < -Math.PI / 2) {
    theta += 2 * Math.PI;
  }
  theta *= 180 / Math.PI;
  return theta;
}
