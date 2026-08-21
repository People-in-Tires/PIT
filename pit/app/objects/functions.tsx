export function overlap(elem1: DOMRect, elem2: DOMRect): boolean {
  return !(
    elem1.right < elem2.left ||
    elem1.left > elem2.right ||
    elem1.bottom < elem2.top ||
    elem1.top > elem2.bottom
  );
}

export function getAngle(
  origin_x: number,
  origin_y: number,
  destination_x: number,
  destination_y: number,
) {
  const newx = destination_x - origin_x;
  const newy = destination_y - origin_y;
  let theta = Math.atan2(-newy, newx);
  if (theta < 0) {
    theta += 2 * Math.PI;
  }
  theta *= 180 / Math.PI;
  return -theta + 90;
}
