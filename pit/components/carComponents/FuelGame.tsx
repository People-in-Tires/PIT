import styles from "@/css/Game.module.css";
import { IGameInstance } from "../UI/GameButton";
import useCarStore from "../engine/carStore";

export default function FuelGame({}: IGameInstance) {
  const car = useCarStore().in_stop;

  return (
    <div>
      <progress value={car?.fueltank.milliliters} max={car?.fueltank.max} />
      <div
        data-interactable={"fuelhole"}
        className={`${styles.hitbox} fuelhole`}
        style={{ height: "200px", width: "200px" }}
      ></div>
    </div>
  );
}
