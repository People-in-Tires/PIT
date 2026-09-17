import { useContext } from "react";
import { CarContext } from "../car";
import styles from "@/css/Game.module.css";
import { IGameInstance } from "../UI/GameButton";
import useCarStore from "../engine/carStore";

export default function FuelGame({ index }: IGameInstance) {
  const fuel = useCarStore().cars[index].fueltank;
  const carmax = 20000; //in milliliters

  return (
    <div>
      <progress value={fuel.milliliters} max={carmax} />
      <div
        data-interactable={"fuelhole"}
        className={`${styles.hitbox} fuelhole`}
        style={{ height: "200px", width: "200px" }}
      ></div>
    </div>
  );
}
