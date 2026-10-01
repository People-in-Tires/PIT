import styles from "@/css/Game.module.css";
import { IGameInstance } from "../UI/GameButton";
import useCarStore from "../engine/carStore";

export default function FuelGame({ index }: IGameInstance) {
  const car = useCarStore().cars[index];

  return (
    <div>
      <progress value={car.fueltank.milliliters} max={car.fueltank.max} />
      <div
        data-interactable={"fuelhole"}
        className={`${styles.hitbox} fuelhole`}
        style={{ height: "200px", width: "200px" }}
      ></div>
    </div>
  );
}
