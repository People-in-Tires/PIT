import React, { RefObject } from "react";
import {
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
} from "react-draggable";
import { ControlPosition } from "react-draggable";

export interface ItemProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface DraggableItemProps extends ItemProps, React.PropsWithChildren {
  onDrag?: DraggableEventHandler;
  onStart?: DraggableEventHandler;
  onStop?: DraggableEventHandler;
  nodeRef: RefObject<HTMLElement | null>;
  defaultPosition?: ControlPosition;
  axis?: "x" | "y" | "none" | "both";
  handle?: string;
  disabled?: boolean;
  canbechildof?: string[];
}

export interface IncRect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}
