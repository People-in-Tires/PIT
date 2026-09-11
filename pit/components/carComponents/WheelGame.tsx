import style from "@/css/Game.module.css";

export default function WheelGame() {
  return (
    <div>
      <div
        className={`${style.hitbox} spoke`}
        style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
      ></div>
    </div>
  );
}
