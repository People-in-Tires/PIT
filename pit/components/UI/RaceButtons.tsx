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
  const { race } = useContext(SimulationContext);

  function send_racer() {
    const car: Car | undefined = getCarSim();
    if (car === undefined || race === undefined) return;
    const car_num = car.number;
    const racers = race.racers;
    racers[car_num - 1].car = car;
    racers[car_num - 1].should_pit = false;
    racers[car_num - 1].t = 1 / race.track_points.length;
    racers[car_num - 1].in_pit = -1;
    race.set_racer(racers[car_num - 1], car_num - 1);
    pushRaceState(race.to_json());
    useCarStore.getState().resetCar();
  }

  return (
    <button
      style={{...style, position: "absolute"}}
      disabled={present_car == undefined}
      onMouseDown={() => {
        setPressed(true);
        send_racer();
      }}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      <img
        style={{position: "absolute", height: "100%", width: "100%"}}
        src={
          pressed
            ? "/elements/buttons/go_button_pressed.svg"
            : "/elements/buttons/go_button_unpressed.svg"
        }
      />
      <img
        style={{position: "absolute", top: present_car ? "-50%" : "50%", height: "200%", width: "100%"}}
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

  function call_racer(car_number: number) {
    if (!race) return;
    const racers = race.racers;
    racers[car_number - 1].should_pit = true;
    race.set_racer(racers[car_number - 1], car_number - 1);
    pushRaceState(race.to_json());
    setPressed(true);
  }

  useEffect(
    () => setPressed(present_car != car_number),
    [car_number, present_car],
  );
  return (
    <button style={{...style, position: "absolute"}} onClick={() => call_racer(car_number)}>
      <img
        style={{position: "absolute", height: "100%", width: "100%"}}
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
        style={{ left: "200px", height: "100px", width: "100px"  }}
        car_number={car_numbers[1]}
        present_car={present_car}
      />
      <GoButton
        style={{ left: "400px", height: "100px", width: "100px"  }}
        present_car={present_car}
      />
    </div>
  );
}
