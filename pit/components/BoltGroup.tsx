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
}: {
  parentTag: string;
  id: number;
  locations: { x: number; y: number }[];
  tightenedPer: number;
} & React.PropsWithChildren) {
  const update = useItemStore().update;
  const [bolted, setBolted] = useState<boolean[]>(
    Array<boolean>(locations.length)
      .fill(false)
      .map((value, index) => index + 1 / locations.length <= tightenedPer),
  );
  const [output] = useState(
    Array(locations.length)
      .fill(1)
      .map((input, i) => (
        <Bolt
          x={locations[i].x}
          y={locations[i].y}
          setBolt={(value: boolean) =>
            setBolted((prevBolted) => {
              const newBolts = prevBolted;
              newBolts[i] = value;
              return [...newBolts];
            })
          }
          parentTag={parentTag}
          tightened={i + 1 / locations.length <= tightenedPer}
          key={i}
          index={i}
        />
      )),
  );
  useEffect(() => {
    update(id, { tightenedPer: atop(bolted) });
  }, [bolted, id, update]);

  return <React.Fragment>{...output}</React.Fragment>;
}
