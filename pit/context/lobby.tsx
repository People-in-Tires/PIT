"use_client";
import { createContext, useState } from "react";

export interface ILobbyContext {
  car_numbers: number[];
}
export const LobbyContext = createContext<ILobbyContext>({
  car_numbers: [1, 2],
}); //have it be changed to which pitstop you have claimed in a lobby

export default function Lobby({ children }: {} & React.PropsWithChildren) {
  const [carnums, setCarnums] = useState<number[]>([1, 2]);

  return (
    <LobbyContext value={{ car_numbers: carnums }}>{children}</LobbyContext>
  );
}
