"use client";

import React, { useEffect } from "react";
import Bolt from "./Bolt";
import { useState } from "react";
import useItemStore from "./engine/itemStore";
import atop from "@/lib/libft/atop";

export default function BoltGroup({
  parentTag,
  id,
  locations,
  tightenedPer,
  setDisabled,
}: {
  parentTag: string;
  id?: number;
  locations: { x: number; y: number }[];
  tightenedPer: number;
  setDisabled?: (input: boolean) => void;
} & React.PropsWithChildren) {
  const [bolted, setBolted] = useState<boolean[]>(
    Array<boolean>(locations.length)
      .fill(false)
      .map((value, index) => index + 1 / locations.length <= tightenedPer),
  );
  const [output] = useState<React.JSX.Element[]>(
    Array(locations.length)
      .fill(1)
      .map((input, i) => (
        <Bolt
          x={locations[i].x}
          y={locations[i].y}
          setBolt={(value: boolean) => {
            setBolted((prevBolted) => {
              const newBolts = prevBolted;
              newBolts[i] = value;
              return newBolts;
            });
          }}
          parentTag={parentTag}
          tightened={i + 1 / locations.length <= tightenedPer}
          key={i}
          index={i}
        />
      )),
  );
  const update = useItemStore().update;

  useEffect(() => {
    if (id != undefined) update(id, { tightenedPer: atop(bolted) });
    if (setDisabled)
      setDisabled(!bolted.every((value: boolean) => value === false));
  }, [...bolted, id, setDisabled, update]);

  return <React.Fragment>{output}</React.Fragment>;
}
