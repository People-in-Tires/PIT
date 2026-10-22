"use client";
import { createContext, use, useState } from "react";

export interface ITeam {
  color: string;
}

export interface ILobbyContext {
  car_numbers: number[];
  raceID: number;
  team: ITeam;
  setRaceID(id: number): void;
}
export const LobbyContext = createContext<ILobbyContext>({
  car_numbers: [1, 2],
  raceID: 1,
  team: { color: "blue" },
  setRaceID: () => {},
}); //have it be changed to which pitstop you have claimed in a lobby

export default function Lobby({ children }: {} & React.PropsWithChildren) {
  const [carnums, setCarnums] = useState<number[]>([1, 2]);
  const [raceID, setRaceID] = useState<number>(0);
  const [team, setTeam] = useState<ITeam>({ color: "blue" });
  return (
    <LobbyContext value={{ car_numbers: carnums, raceID, team, setRaceID }}>
      {children}
    </LobbyContext>
  );
}
