export function toLocalCoords(
  el: HTMLElement,
  clientX: number,
  clientY: number,
) {
  const rect = el.getBoundingClientRect();
  return { x: clientX - rect.left, y: clientY - rect.top };
}
