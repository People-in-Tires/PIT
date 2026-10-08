import { PropsWithChildren } from "react";
import { motion } from "motion/react";

export interface IMiniMapCar extends PropsWithChildren {
  position: { x: number; y: number };
  color: string;
  rotation: number;
  car_number: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function MiniMapCar({
  position,
  color,
  rotation,
  car_number,
  onMouseEnter,
  onMouseLeave,
}: IMiniMapCar) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "absolute",
        height: `10%`,
        transformOrigin: "50%, 50%",
        transform: "translateX(-50%) translateY(-50%)",
        aspectRatio: "1",
      }}
      initial={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        rotate: `${rotation}deg`,
      }}
      animate={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        rotate: `${rotation}deg`,
      }}
      transition={{ duration: 1, ease: "linear" }}
    >
      <img
        alt="minimap_car"
        style={{ position: "absolute", height: "100%", width: "100%" }}
        src={"/elements/minimapcar/minimap_car.png"}
      />
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          maskOrigin: "border-box",
          maskImage: `url("/elements/minimapcar/minimap_car_mask.png")`,
          maskSize: `100%`,
          backgroundColor: color,
        }}
      />
      <text
        style={{
          position: "absolute",
          font: "serif",
          fontSize: "100%",
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          left: "50%",
        }}
      >
        {car_number}
      </text>
    </motion.div>
  );
}
