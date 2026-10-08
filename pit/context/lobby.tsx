"use_client"
import { Children, createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { SimulationContext } from "./simulation";
import { Race } from "@/lib/wasm/simulation";
import { pullRaceState } from "@/lib/race/actions";
import useCarStore from "@/components/engine/carStore";

export interface ILobbyContext {
  car_numbers: number[];
}
export const LobbyContext = createContext<ILobbyContext>({
  car_numbers: [3, 4],
}); //have it be changed to which pitstop you have claimed in a lobby

export default function Lobby({children }:{} & React.PropsWithChildren){
  const [carnums, setCarnums] = useState<number[]>([3, 4])
  const {ready} = useContext(SimulationContext)

  useEffect(() => {
    async function load() {
      const raceState = await pullRaceState();
      console.log(raceState.state)
      if (ready && raceState.state != "") {
        const race = Race.from_json(raceState.state);
        if (race) {
          const pit_lane = race.racers.filter(
            (value) =>
              value.in_pit === 0 && carnums.includes(value.car.number)
          ); //filter for team
          // console.log(carnums, race.racers.map((value)=>[value.car.number, value.should_pit, value.in_pit, value.t]))
          if (
            pit_lane.length > 0 &&
            useCarStore.getState().in_stop == undefined
          )
            useCarStore.getState().setCarSim(pit_lane[0].car);
        }
      }
    }
    const interval = setInterval(load, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [ready, carnums]);

  return <LobbyContext value={{car_numbers: carnums}}>
    {children}
  </LobbyContext>
}