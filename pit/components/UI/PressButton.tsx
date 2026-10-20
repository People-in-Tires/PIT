"use client";
import { CSSProperties, useState } from "react";

export default function PressButton({
  buttonStyle,
  imgClass,
  children,
  disabled,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  imgSrcs,
}: {
  buttonStyle?: CSSProperties;
  imgClass?: string;
  disabled?: boolean;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onMouseLeave?: () => void;
  imgSrcs?: string[];
} & React.PropsWithChildren) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      style={{ ...buttonStyle, position: "relative" }}
      disabled={disabled}
      onClick={() => {
        setPressed(true);
        if (onClick) onClick();
      }}
      onMouseDown={() => {
        setPressed(true);
        if (onMouseDown) onMouseDown();
      }}
      onMouseUp={() => {
        setPressed(false);
        if (onMouseUp) onMouseUp();
      }}
      onMouseLeave={() => {
        setPressed(false);
        if (onMouseLeave) onMouseLeave();
      }}
    >
      {imgSrcs && imgSrcs.length > 0 && (
        <img
          className={imgClass}
          style={{ height: "100%", width: "100%" }}
          src={pressed || imgSrcs.length == 1 ? imgSrcs[0] : imgSrcs[1]}
          alt={"Press and hold this button"}
        />
      )}
      {children}
    </button>
  );
}
