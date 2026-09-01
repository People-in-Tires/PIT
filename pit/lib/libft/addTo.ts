import overlap from "./overlap";
import styles from "@/css/Game.module.css";
//add classname for container t
export default function addTo(
  node: HTMLElement,
  destination: string,
  hitbox?: HTMLElement,
  maxcount?: number,
): Element | null {
  if (maxcount == undefined) maxcount = 1;

  const destinationNode = overlap(hitbox? hitbox : node, destination)
  if (!destinationNode)
    return null;
  if (maxcount == 0 ||
      destinationNode.getElementsByClassName(`${styles.item}`).length <= maxcount)
  {
    destinationNode.moveBefore(node, null);
    return destinationNode;
  }
  return null;
}
