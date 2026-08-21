import React from "react";

export interface ItemProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface IncRect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}
