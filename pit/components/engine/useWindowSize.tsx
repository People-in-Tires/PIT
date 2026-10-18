"use client";
import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const [truesize, setTrueSize] = useState({ windowHeight: 0, windowWidth: 0 });
  const [size, setSize] = useState({ windowHeight: 0, windowWidth: 0 });

  useEffect(() => {
    const timeout = setTimeout(() => {
      let newheight = size.windowHeight,
        newwidth = size.windowWidth;
      if ((size.windowWidth * 9) / 16 < size.windowHeight)
        newheight = (size.windowWidth * 9) / 16;
      else newwidth = (size.windowHeight * 16) / 9;
      setTrueSize({ windowHeight: newheight, windowWidth: newwidth });
    }, 50);
    return () => clearTimeout(timeout);
  }, [size]);

  useEffect(() => {
    function updateSize() {
      setSize({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return truesize;
};
