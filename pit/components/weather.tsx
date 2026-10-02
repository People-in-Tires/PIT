"use client";
import { Weather } from "@/lib/wasm/simulation";
import Image from "next/image";
import React, {
  createRef,
  Key,
  StyleHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";

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
  position: IVector;
  direction: IVector;
  duration: number;
  id: number;
}

export function Particle({
  position,
  direction,
  children,
  id,
  duration,
}: IParticle & React.PropsWithChildren) {
  return (
    <motion.div
      style={{ position: "absolute" }}
      initial={{ left: position.x, top: position.y }}
      animate={{
        left: position.x + (direction.x * duration) / 10,
        top: position.y + (direction.y * duration) / 10,
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
}: {
  area: IRect;
  angle: IVector;
  angle_range: number;
  frequency: number;
  duration: number;
} & React.PropsWithChildren) {
  const [elements, setElements] = useState<React.JSX.Element[]>([]);
  useEffect(() => {
    function new_id() {
      const seen: (string | null)[] = [];
      for (let i = 0; i < elements.length; i++) {
        seen.push(elements[i].key);
      }
      for (let i = 0; i <= elements.length + 1; i++) {
        if (!seen.includes(i.toString())) return i;
      }
      return elements.length;
    }

    const interval = setInterval(() => {
      const id = new_id();
      const x = Math.random() * area.width + area.x;
      const y = Math.random() * area.height + area.y;
      const angle_offset = (Math.random() - 0.5) * 2 * Math.PI * angle_range;
      const direction: IVector = {
        x: Math.cos(angle_offset) * angle.x - Math.sin(angle_offset) * angle.y,
        y: Math.sin(angle_offset) * angle.x + Math.cos(angle_offset) * angle.y,
      };
      setElements((prevValue) => [
        ...prevValue,
        <Particle
          position={{ x: x, y: y }}
          direction={direction}
          duration={duration}
          key={id}
          id={id}
        >
          {" "}
          {children}{" "}
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
//fade from gif to gif
// export default function WWeather({weather = 0}: {weather?: Weather}) {
// 	const sprites: string[] = ["/Sunny.gif", "/buggy.gif", "/laggy.gif", "/animals.gif", "/thunder.gif"]
// 	return <div><ParticleSource  position={{x: 500, y: 500, height: 100, width: 500}} frequency={100}/></div>
// }
