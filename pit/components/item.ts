import React, { RefObject } from "react";
import { inherits } from "util";
import {
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
} from "react-draggable";
import { ControlPosition } from "react-draggable";
export interface ItemProps {
  id: number;
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
