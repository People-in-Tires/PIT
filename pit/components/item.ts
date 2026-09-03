import React, { RefObject } from "react";
import {
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
} from "react-draggable";
import { ControlPosition } from "react-draggable";

export interface IncRect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}
