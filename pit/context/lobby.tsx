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
  setCarnums(ids: number[]): void;
}
export const LobbyContext = createContext<ILobbyContext>({
  car_numbers: [],
  raceID: -1,
  team: { color: "blue" },
  setRaceID: () => {},
  setCarnums: () => {},
}); //have it be changed to which pitstop you have claimed in a lobby

export default function Lobby({ children }: {} & React.PropsWithChildren) {
  const [carnums, setCarnums] = useState<number[]>([]);
  const [raceID, setRaceID] = useState<number>(-1);
  const [team, setTeam] = useState<ITeam>({ color: "blue" });
  return (
    <LobbyContext
      value={{ car_numbers: carnums, raceID, team, setRaceID, setCarnums }}
    >
      {children}
    </LobbyContext>
  );
}
