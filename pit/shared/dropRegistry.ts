export interface DropContext {
  containerEl: HTMLElement;
  id: number;
  clientX: number;
  clientY: number;
  itemClientX: number;
  itemClientY: number;
}

export type DropHandler = (ctx: DropContext) => boolean;

const handlers = new Map<string, DropHandler>();

export function registerDropHandler(containerId: string, handler: DropHandler) {
  handlers.set(containerId, handler);
}

export function unregisterDropHandler(containerId: string) {
  handlers.delete(containerId);
}

export function getDropHandler(containerId: string): DropHandler | undefined {
  return handlers.get(containerId);
}

export function toLocalCoords(
  el: HTMLElement,
  clientX: number,
  clientY: number,
) {
  const rect = el.getBoundingClientRect();
  return { x: clientX - rect.left, y: clientY - rect.top };
}

/*
{data-interactable} => other item being dropped on
{data-container} => other item being dropped on
{item.type} + "stop" => on this item being dropped
{item.type} + "start" => on this item being picked up
{item.type} + "drag" => on this item being dragged
boolean return true do default, return false dont do default
*/
