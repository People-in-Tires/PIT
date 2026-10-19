"use client";

import { CSSProperties, useState } from "react";
import Image from "next/image";

export default function ToggleButton({
  children,
  onClick,
  reset,
  buttonStyle,
  imgClass,
  imgSrcs,
}: {
  imgSrcs?: string[];
  reset: boolean | "onRepeat";
  buttonStyle?: CSSProperties;
  imgClass?: string;
  onClick: () => void;
} & React.PropsWithChildren) {
  const [pressed, setPressed] = useState(false);
  if (pressed != false && reset != undefined && reset != "onRepeat") setPressed(false);

  return (
    <button
      style={{ ...buttonStyle, position: "relative" }}
      disabled={reset == "onRepeat" ? false : pressed}
      onClick={() => {
        setPressed((prevValue) => (reset == "onRepeat" ? !prevValue : true));
        onClick();
      }}
    >
      {imgSrcs && imgSrcs.length > 0 && (
        <Image
          className={imgClass}
          style={{ height: "100%", width: "100%" }}
          src={pressed || imgSrcs.length == 1 ? imgSrcs[0] : imgSrcs[1]}
          height={200}
          width={200}
          alt={"Press and hold this button"}
        />
      )}
      {children}
    </button>
  );
}
