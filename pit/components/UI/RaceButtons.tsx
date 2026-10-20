import { Car } from "@/lib/wasm/simulation";
import useCarStore from "../engine/carStore";
import { pushRaceState } from "@/lib/race/actions";
import { getCarSim } from "../engine/carStore";
import React, { CSSProperties, useEffect } from "react";
import { useContext } from "react";
import { SimulationContext } from "@/context/simulation";
import { LobbyContext } from "@/context/lobby";
import { useState } from "react";
import { Race } from "@/lib/wasm/simulation";
import { Particle } from "../ParticleSource";
import PressButton from "./PressButton";
import ToggleButton from "./ToggleButton";

function GoButton({
  present_car,
  style,
}: {
  present_car: number;
  style: CSSProperties;
}) {
  const { race } = useContext(SimulationContext);
  const { raceID } = useContext(LobbyContext);
  const resetCar = useCarStore().resetCar;

  function send_racer(newRace?: Race) {
    if (newRace == undefined || present_car == -1) return;
    const racer = newRace.racers[present_car -1];
    const car = getCarSim(racer.car);
    if (!car) return;
    racer.car = car;
    racer.leave_pit();
    newRace.set_racer(racer);
    console.log(newRace.to_json())
    pushRaceState(newRace.to_json(), raceID);
    resetCar();
  }

  return (
    <PressButton
      buttonStyle={{ ...style, position: "relative" }}
      disabled={present_car == -1}
      onMouseDown={() => send_racer(race)}
      imgSrcs={[
        "/elements/buttons/go_button_pressed.svg",
        "/elements/buttons/go_button_unpressed.svg",
      ]}
    >
      <img
        style={{
          position: "absolute",
          top: present_car != -1 ? "-50%" : "-150%",
          height: "200%",
          width: "100%",
        }}
        src={
          present_car != -1
            ? "/elements/buttons/go_button_shield_open.svg"
            : "/elements/buttons/go_button_shield_closed.svg"
        }
      />
    </PressButton>
  );
}
// export type EPitReason = "way ahead of ya boss" | "roger" | "maintenance required" | "nah, i'd drive";

function CallButton({
  car_number,
  present_car,
  style,
}: {
  car_number: number;
  present_car: number;
  style: CSSProperties;
}) {
  const [response, setResponse] = useState("");
  const { race } = useContext(SimulationContext);

  function call_racer(index: number) {
    if (!race) return;
    const racer = race.racers[index];
    const response = racer.request_pit();
    setResponse(response);
    setTimeout(() => {
      setResponse("");
    }, 1000);
    if (response == "nah, i'd drive") return;
    race.set_racer(racer);
    console.log(race.to_json())
    pushRaceState(race.to_json());
  }

  return (
    <ToggleButton
      buttonStyle={{ ...style, position: "relative" }}
      onClick={() => call_racer(car_number -1)}
      imgSrcs={[
        "/elements/buttons/angle-left.svg",
        "/elements/buttons/angle-right.svg",
      ]}
      reset={car_number == present_car}
    >
      {response.length > 0 && (
        <Particle
          area={{ x: 0, y: 0, width: 100, height: 20 }}
          direction={{ x: 0.77, y: -0.77 }}
          distance={100}
          duration={1000}
        >
          {" "}
          {response}{" "}
        </Particle>
      )}
      {car_number}
    </ToggleButton>
  );
}

export default function RaceButtons({ width = 10 }: { width?: number }) {
  const { car_numbers } = useContext(LobbyContext);
  const present_car = useCarStore().in_stop?.car_number;

  return (
    <React.Fragment>
      <CallButton
        style={{ width: `${width / 3}vw`, height: `${width / 3}vw` }}
        car_number={car_numbers[0]}
        present_car={present_car ? present_car : -1}
      />
      <CallButton
        style={{ width: `${width / 3}vw`, height: `${width / 3}vw` }}
        car_number={car_numbers[1]}
        present_car={present_car ? present_car : -1}
      />
      <GoButton
        style={{ width: `${width / 3}vw`, height: `${width / 3}vw` }}
        present_car={present_car ? present_car : -1}
      />
    </React.Fragment>
  );
}
