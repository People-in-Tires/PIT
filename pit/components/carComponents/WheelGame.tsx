import { MiniGameProps } from "@/components/GameButton";
import React, { createContext, createRef, useEffect, useState } from "react";

export default function WheelGame({ metadata, setOutput }: {} & MiniGameProps) {
  //wheel context tracks bolts
  //have wheel function and pass as child the specifics
  const [wheel, setWheel] = useState<React.JSX.Element>(
    metadata["wheel"] as React.JSX.Element,
  );

  return (
    <div>
      <div className={"wheelslot"} style={{ top: "50%", left: "50%" }}>
        {wheel}
      </div>
    </div>
  );
}
