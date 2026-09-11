export function overlap_rects(elem1: DOMRect, elem2: DOMRect): boolean {
  return !(
    elem1.right < elem2.left ||
    elem1.left > elem2.right ||
    elem1.bottom < elem2.top ||
    elem1.top > elem2.bottom
  );
}

export default function overlap(
  hitbox: HTMLElement,
  destination: string,
  parent_dest?: string,
): Element | undefined {
  const hitboxRect = hitbox.getBoundingClientRect();
  let parentNodes: HTMLCollectionOf<Element>;
  if (parent_dest) {
    parentNodes = document.getElementsByClassName(parent_dest);
    for (const parentNode of parentNodes) {
      const destinationNodes = parentNode.getElementsByClassName(destination);
      if (destinationNodes)
        for (const destinationNode of destinationNodes) {
          if (
            overlap_rects(hitboxRect, destinationNode.getBoundingClientRect())
          ) {
            return destinationNode;
          }
        }
    }
    return undefined;
  } else {
    const destinationNode = document.getElementById(destination);
    if (
      destinationNode &&
      overlap_rects(hitboxRect, destinationNode.getBoundingClientRect())
    ) {
      return destinationNode;
    }
  }

  const destinationNodes = document.getElementsByClassName(destination);
  if (destinationNodes)
    for (const destinationNode of destinationNodes) {
      if (overlap_rects(hitboxRect, destinationNode.getBoundingClientRect())) {
        return destinationNode;
      }
    }
  return undefined;
}
