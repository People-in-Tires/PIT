import useCarStore from "../engine/carStore";
import { useContext } from "react";
import { CarContext } from "../car";
import styles from "@/css/Game.module.css";
export default function FuelGame() {
  const setOutput = useCarStore().setBackflap;
  const car = useContext(CarContext);
  if (!car) return null;

  return (
    <div>
      <div
        data-interactable={"fuelhole"}
        className={styles.hitbox}
        style={{ height: "200px", width: "200px" }}
      ></div>
    </div>
  );
}
