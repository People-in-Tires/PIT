export interface Handler {
  id: number;
}

export interface ContainerHandler extends Handler {
  containerElement: HTMLElement;
}

export interface ContainerStopHandler extends ContainerHandler {
  clientX: number;
  clientY: number;
  itemClientX: number;
  itemClientY: number;
}

export interface InteractableHandler extends Handler {
  interactableElement: HTMLElement;
}

export enum action {
  done,
  fallback,
  interrupt,
}

export type Itemhandler = (handler: Handler) => action;

/*
NAMING CONVENTION
(<data-interactable> | <data-container> | <item.type>) + ("_start" | "_drag" | "_stop")
return action
*/

const handlers = new Map<string, Itemhandler>();

function registerItemHandler<T extends Handler>(
  name: string,
  handler: (handler: T) => action,
) {
  handlers.set(name, handler as unknown as Itemhandler);
}

function unregisterItemHandler(name: string) {
  handlers.delete(name);
}

function getItemHandler(name: string): Itemhandler | undefined {
  return handlers.get(name);
}

function makeHandlerGetter(suffix: "_start" | "_drag" | "_stop") {
  return function <T extends Handler>(name: string) {
    return getItemHandler(name + suffix) as
      ((handler: T) => action) | undefined;
  };
}

export const getStartHandler = makeHandlerGetter("_start");
export const getDragHandler = makeHandlerGetter("_drag");
export const getStopHandler = makeHandlerGetter("_stop");

function makeHandlerRegistrar(suffix: "_start" | "_drag" | "_stop") {
  return function <T extends Handler>(
    name: string,
    handler: (handler: T) => action,
  ) {
    registerItemHandler<T>(name + suffix, handler);
  };
}

export const registerStartHandler = makeHandlerRegistrar("_start");
export const registerDragHandler = makeHandlerRegistrar("_drag");
export const registerStopHandler = makeHandlerRegistrar("_stop");

function makeHandlerUnregistrar(suffix: "_start" | "_drag" | "_stop") {
  return (name: string) => unregisterItemHandler(name + suffix);
}

export const unregisterStartHandler = makeHandlerUnregistrar("_start");
export const unregisterDragHandler = makeHandlerUnregistrar("_drag");
export const unregisterStopHandler = makeHandlerUnregistrar("_stop");
