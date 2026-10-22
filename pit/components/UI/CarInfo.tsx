import { Racer } from "@/lib/wasm/simulation";
import styles from "@/css/Game.module.css";

export default function RacerInfo({ racer }: { racer: Racer }) {
  return (
    <div
      style={{
        height: "fit-content",
        width: "fit-content",
        position: "relative",
        left: "110%",
        top: "-10%",
        backgroundColor: "grey",
        borderTopColor: "lightgrey",
        borderLeftColor: "lightgrey",
        borderRightColor: "darkgrey",
        borderBottomColor: "darkgrey",
        borderWidth: "0.5cqw",
      }}
    >
      <header
        id={`windowhandle`}
        style={{
          height: "2cqh",
          width: "100%",
          font: "100% FireSans",
          backgroundColor: "darkblue",
        }}
      >
        Name: {racer.driver.name}, Car Number: #{racer.car.number}
      </header>
      <ul>
        <li>
          Name: {racer.driver.name}, Car Number: #{racer.car.number}
        </li>
        <li>
          Lap Progress:{" "}
          {(racer.t * 100).toFixed(3).replace(/(0*$)|(\.0*$)/, "")}
          %, Lap Count: {racer.lap_count}
        </li>
        <li>
          Current Speed:{" "}
          {(racer.speed * 1000).toFixed(3).replace(/(0*$)|(\.0*$)/, "")}kph
        </li>
        <li>
          Current Fuel: {racer.car.chassis.fuel / 1000}/
          {racer.car.chassis.tenderness / 1000}l
        </li>
      </ul>
    </div>
  );
}
