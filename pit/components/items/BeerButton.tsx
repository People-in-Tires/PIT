"use client";

import Image from "next/image";
import useItemStore from "@/components/engine/itemStore";
import usePlayerStore from "@/components/engine/playerStore";

export function BeerButton({ container }: { container: string }) {
  const add = useItemStore((state) => state.add);
  const crementDrunk = usePlayerStore().crementDrunk;

  function drink() {
    console.log("drunk level updated: ", crementDrunk(+5));
  }

  function spawnBeer() {
    add({
      type: "beer",
      container,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
    });
    drink();
  }

  return (
    <button
      style={{ position: "absolute", top: 0, left: 0 }}
      onClick={spawnBeer}
      id="BeerButton"
    >
      <Image
        draggable="false"
        src="/beer.png"
        width={80}
        height={80}
        alt="Spawn beer"
      />
    </button>
  );
}
