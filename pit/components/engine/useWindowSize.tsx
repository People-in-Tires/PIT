"use client";
import { useState, useLayoutEffect, useEffect } from "react";

export default function useWindowSize() {
  const [size, setSize] = useState({ height: 0, width: 0 });

  function updateSize() {
    let newheight = window.innerHeight,
      newwidth = window.innerWidth;
    if ((window.innerWidth * 9) / 16 < window.innerHeight)
      newheight = (window.innerWidth * 9) / 16;
    else newwidth = (window.innerHeight * 16) / 9;
    console.log(newheight, window.innerHeight, newwidth, window.innerWidth);
    setSize({ height: newheight, width: newwidth });
  }
  if (size.height == 0)
    updateSize()
  useEffect(() => {

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}
