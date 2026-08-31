import overlap from "./overlap";
import styles from "@/css/Game.module.css"
//add classname for container t
export default function addTo(node: HTMLElement, destination: string, hitbox?: HTMLElement, maxcount?: number): Element | null {
  const tmp = document.getElementsByClassName(destination);
  const hitboxRect = hitbox ? hitbox.getBoundingClientRect() : node.getBoundingClientRect();
  if (!tmp) return null;
  if (maxcount == undefined)
    maxcount = 1;
  for (let destinationNode of tmp) {
    if (
      overlap(
        hitboxRect,
        destinationNode.getBoundingClientRect(),
      ) && (maxcount == 0 || 
      destinationNode.getElementsByClassName(`${styles.item}`).length != maxcount)
    ) {
      console.log(destinationNode)
      destinationNode.moveBefore(node, null);
      return destinationNode
    }
  }
  return null;
}
