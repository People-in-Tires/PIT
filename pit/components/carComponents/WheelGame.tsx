import { MiniGameProps } from "@/components/GameButton";
import React, { createContext, createRef, useEffect, useState } from "react";

export default function WheelGame({ metadata, setOutput }: {} & MiniGameProps) {
  //wheel context tracks bolts
  //have wheel function and pass as child the specifics
  return <>{metadata["wheel"]}</>;
}
