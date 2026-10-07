import { createContext } from "react";

export interface ILobbyContext {
  car_numbers: number[];
}
export const LobbyContext = createContext<ILobbyContext>({
  car_numbers: [1, 2],
}); //have it be changed to which pitstop you have claimed in a lobby
