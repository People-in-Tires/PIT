import { MiniGameProps } from "@/components/GameButton";
import React, { createContext, createRef, useEffect, useState } from "react";
import { StateContext } from "@/app/page";

export const WheelContext = createContext<StateContext | undefined>(undefined);

export default function WheelGame({ metadata, setOutput }: {} & MiniGameProps) {
  //wheel context tracks bolts
  //have wheel function and pass as child the specifics
  return (
    <>
      <WheelContext value={undefined}>{metadata["wheel"]}</WheelContext>
    </>
  );
}
