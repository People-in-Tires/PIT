"use client";

import { motion } from "motion/react";
import React, { useState, useEffect } from "react";

export interface IVector {
  x: number;
  y: number;
}
export interface IRect {
  x: number;
  y: number;
  height: number;
  width: number;
}
export interface IParticle extends React.PropsWithChildren {
  area: IRect;
  distance: number;
  direction: IVector;
  duration: number;
  id: number;
}

let next_id: number = -1;

export function Particle({
  area,
  direction,
  children,
  distance,
  id,
  duration,
}: IParticle & React.PropsWithChildren) {
  return (
    <motion.div
      style={{
        position: "absolute",
        zIndex: -3,
        height: area.height,
        width: area.width,
      }}
      initial={{ left: area.x, top: area.y }}
      animate={{
        left: area.x + direction.x * distance,
        top: area.y + direction.y * distance,
      }}
      transition={{ ease: "linear", duration: duration / 1000 }}
    >
      {children}
    </motion.div>
  );
}

export function ParticleSource({
  area,
  angle,
  angle_range,
  frequency,
  duration,
  children,
  size,
  size_range,
  speed,
  speed_range,
}: {
  area: IRect;
  angle: IVector;
  angle_range?: number;
  size: number;
  size_range?: number;
  speed: number;
  speed_range?: number;
  frequency: number;
  duration: number;
} & React.PropsWithChildren) {
  const [elements, setElements] = useState<React.JSX.Element[]>([]);
  useEffect(() => {
    function new_id() {
      return ++next_id;
    }

    const interval = setInterval(() => {
      const id = new_id();
      const x = Math.random() * area.width + area.x;
      const y = Math.random() * area.height + area.y;
      const angle_offset = angle_range
        ? (Math.random() - 0.5) * 2 * Math.PI * angle_range
        : 0;
      const speed_offset = speed_range ? Math.random() * speed_range : 0;
      const size_offset = size_range
        ? (Math.random() + Math.random() - 1) * size_range
        : 0;
      const direction: IVector = {
        x: Math.cos(angle_offset) * angle.x - Math.sin(angle_offset) * angle.y,
        y: Math.sin(angle_offset) * angle.x + Math.cos(angle_offset) * angle.y,
      };
      setElements((prevValue) => [
        ...prevValue,
        <Particle
          area={{
            x: x,
            y: y,
            height: size + size_offset,
            width: size + size_offset,
          }}
          direction={direction}
          duration={duration}
          distance={speed + speed_offset}
          key={id}
          id={id}
        >
          {children}
        </Particle>,
      ]);
      setTimeout(() => {
        setElements((prevValue) =>
          prevValue.filter((value) => value.key !== `${id}`),
        );
      }, duration);
    }, frequency);
    return () => clearInterval(interval);
  }, [elements, setElements]);
  return <React.Fragment>{elements}</React.Fragment>;
}
