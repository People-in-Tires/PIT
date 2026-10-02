import { ParticleSource } from "@/components/weather";
import { default as beer } from "@/public/beer.png";
import { default as cloud } from "@/public/vercel.svg";
import Image from "next/image";
import React from "react";

export default function Page({}) {
  return (
    <React.Fragment>
      <ParticleSource
        area={{ x: 0, y: 100, width: 100, height: 1000 }}
        angle={{ x: 1, y: 0 }}
        angle_range={0.05}
        frequency={1000 / 5}
        duration={5000}
      >
        <ParticleSource
          area={{ x: 0, y: 100, width: 200, height: 0 }}
          angle={{ x: -0.1, y: 0.9 }}
          angle_range={0.05}
          frequency={1000 / 30}
          duration={1000}
        >
          <Image src={beer} width={16} height={16} alt="rain" />
        </ParticleSource>
        <Image src={cloud} width={200} height={100} alt="rain" />
      </ParticleSource>
    </React.Fragment>
  );
}
