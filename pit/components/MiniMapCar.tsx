import { PropsWithChildren } from "react";

export default function MiniMapCar({
  position,
  color,
  rotation,
  car_number,
  onMouseEnter,
  onMouseLeave,
  children
}: {
  position: { x: number; y: number };
  color: string;
  rotation: number;
  car_number: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
} & PropsWithChildren) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        height: `10%`,
        rotate: `${rotation}deg`,
        transformOrigin: "50%, 50%",
        transform: "translateX(-50%) translateY(-50%)",
        aspectRatio: "1",
      }}
    >
      <img
        style={{ position: "absolute", height: "100%", width: "100%" }}
        src={"/minimap_car.png"}
      />
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          maskOrigin: "border-box",
          maskImage: `url("minimap_car_mask.png")`,
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
    </div>
  );
}
