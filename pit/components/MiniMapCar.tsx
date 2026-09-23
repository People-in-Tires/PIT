export default function MiniMapCar({
  position,
  scalar,
  color,
  rotation,
}: {
  position: { x: number; y: number };
  scalar: number;
  color: string;
  rotation: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        height: `${scalar}vh`,
        rotate: `${rotation}deg`,
        transformOrigin: "50%, 50%",
        aspectRatio: "1",
      }}
    >
      <img style={{ position: "absolute" }} src={"/minimap_car.png"} />
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          maskOrigin: "border-box",
          maskImage: `url("minimap_car_mask.png")`,
          maskSize: `${scalar}vh`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}
