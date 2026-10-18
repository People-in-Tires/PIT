"use_client";
import { createContext, use, useState } from "react";

export interface ILobbyContext {
  car_numbers: number[];
  raceID: number;
}
export const LobbyContext = createContext<ILobbyContext>({
  car_numbers: [1, 2],
  raceID: 1,
}); //have it be changed to which pitstop you have claimed in a lobby

export default function Lobby({ children }: {} & React.PropsWithChildren) {
  const [carnums, setCarnums] = useState<number[]>([1, 2]);
  const [raceID, setRaceID] = useState<number>(0)

  return (
    <LobbyContext value={{ car_numbers: carnums, raceID: raceID }}>{children}</LobbyContext>
  );
}
