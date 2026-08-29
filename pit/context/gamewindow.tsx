import React, { createContext, useState } from "react";

export const GameWindowContext = createContext<
  | {
      state: React.JSX.Element[];
      setState: React.Dispatch<React.SetStateAction<React.JSX.Element[]>>;
    }
  | undefined
>(undefined);

export default function GameWindowWrapper({
  children,
}: {} & React.PropsWithChildren) {
  const [elements, setElements] = useState<React.JSX.Element[]>([]);

  return (
    <GameWindowContext value={{ state: elements, setState: setElements }}>
      {children}
    </GameWindowContext>
  );
}
