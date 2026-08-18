"use client";

import React, { useState, createContext, useRef } from "react";
import Image from "next/image";

import MapEditor from "./objects/mapEditor"

export default function Home() {
  return (
      <MapEditor />
  );
}
