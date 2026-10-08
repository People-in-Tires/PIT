import { Car } from "@/lib/wasm/simulation";
import useCarStore from "../engine/carStore";
import { pushRaceState } from "@/lib/race/actions";
import { getCarSim } from "../engine/carStore";
import { CSSProperties, useEffect } from "react";
import { useContext } from "react";
import { SimulationContext } from "@/context/simulation";
import { LobbyContext } from "@/context/lobby";
import { useState } from "react";

function GoButton({
  present_car,
  style,
}: {
  present_car: number | undefined;
  style: CSSProperties;
}) {
  const [pressed, setPressed] = useState(false);
  const { race, setRace } = useContext(SimulationContext);

  function send_racer() {
    const car: Car | undefined = getCarSim();
    if (car === undefined || race === undefined || setRace === undefined)
      return;
    setRace((prevRace) => {
      if (!prevRace) return prevRace;
      const racer = prevRace.racers[car.number];
      racer.car = car;
      racer.leave_pit();
      prevRace.set_racer(racer);
      pushRaceState(prevRace.to_json());
    });
    useCarStore.getState().resetCar();
  }

  return (
    <button
      style={{ ...style, position: "absolute" }}
      disabled={present_car == undefined}
      onMouseDown={() => {
        setPressed(true);
        send_racer();
      }}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      <img
        style={{ position: "absolute", height: "100%", width: "100%" }}
        src={
          pressed
            ? "/elements/buttons/go_button_pressed.svg"
            : "/elements/buttons/go_button_unpressed.svg"
        }
      />
      <img
        style={{
          position: "absolute",
          top: present_car ? "-50%" : "50%",
          height: "200%",
          width: "100%",
        }}
        src={
          present_car
            ? "/elements/buttons/go_button_shield_open.svg"
            : "/elements/buttons/go_button_shield_closed.svg"
        }
      />
    </button>
  );
}

function CallButton({
  car_number,
  present_car,
  style,
}: {
  car_number: number;
  present_car: number | undefined;
  style: CSSProperties;
}) {
  const [pressed, setPressed] = useState(false);
  const { race } = useContext(SimulationContext);
  if (pressed != false && car_number == present_car) setPressed(false);
  function call_racer(car_number: number) {
    if (!race) return;
    const racer = race.racers[car_number];
    racer.request_pit();
    race.set_racer(racer);
    pushRaceState(race.to_json());
    setPressed(true);
  }

  return (
    <button
      style={{ ...style, position: "absolute" }}
      onClick={() => call_racer(car_number)}
    >
      <img
        style={{ position: "absolute", height: "100%", width: "100%" }}
        src={
          pressed
            ? "/elements/buttons/comein_button_down.svg"
            : "/elements/buttons/comein_button_up.svg"
        }
      />
    </button>
  );
}

export default function RaceButtons() {
  const { race } = useContext(SimulationContext);
  const { car_numbers } = useContext(LobbyContext);
  const present_car = useCarStore().sim_value?.number;

  if (!race) return <></>;
  return (
    <div style={{ position: "absolute" }}>
      <CallButton
        style={{ left: "0px", height: "100px", width: "100px" }}
        car_number={car_numbers[0]}
        present_car={present_car}
      />
      <CallButton
        style={{ left: "200px", height: "100px", width: "100px" }}
        car_number={car_numbers[1]}
        present_car={present_car}
      />
      <GoButton
        style={{ left: "400px", height: "100px", width: "100px" }}
        present_car={present_car}
      />
    </div>
  );
}
