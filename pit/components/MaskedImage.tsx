"use client";
import React from "react";

export default function MaskedImage({
  src,
  maskSrc,
  color,
}: {
  src: string;
  maskSrc: string;
  color: string;
}) {
  return (
    <React.Fragment>
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          maskOrigin: "border-box",
          maskImage: `url(${maskSrc})`,
          maskSize: `100%`,
          backgroundColor: color,
        }}
      />
      <img
        style={{ position: "absolute" }}
        src={src}
        height={"100%"}
        width={"100%"}
        alt="MaskedBackground"
        draggable={false}
      />
    </React.Fragment>
  );
}
