"use client";

import Image from "next/image";
import useItemStore from "@/components/engine/itemStore";

export function WheelButton({
  container,
  type,
}: {
  container: string;
  type: string;
}) {
  const add = useItemStore((state) => state.add);

  function spawnWheel() {
    add({
      type: type,
      container,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
    });
  }

  return (
    <button
      style={{ position: "absolute", top: 100, left: 100 }}
      onClick={spawnWheel}
    >
      <Image
        draggable="false"
        src="/wheelnormal.svg"
        width={80}
        height={80}
        alt="Spawn wheel"
      />
    </button>
  );
}
