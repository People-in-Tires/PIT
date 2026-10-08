import { SimulationContext } from "@/context/simulation";
import { useContext, useEffect } from "react";
import { ParticleSource } from "./ParticleSource";
import { motion } from "motion/react";
import { useState } from "react";
// export enum Weather {
//   Sunny = 0,
//   Buggy = 1,
//   Laggy = 2,
//   CatsAndDogs = 3,
//   Thunderstorm = 4,
// }

function CatDog() {
  const imgs = [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/Sleeping_cat_on_her_back.jpg/960px-Sleeping_cat_on_her_back.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/German-Shepherd-dog-rainbow-shake.jpg/960px-German-Shepherd-dog-rainbow-shake.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
  ];
  const [i, setI] = useState(0);
  useEffect(() => setI(Math.random()), []);
  return (
    <img
      style={{ height: "fill", width: "fill", rotate: "-90deg" }}
      src={imgs[i > 0.5 ? 0 : 1]}
      alt="cloud"
    />
  );
}

export default function Weather() {
  const weather = useContext(SimulationContext)?.weather;
  let content: React.JSX.Element | undefined = undefined;
  switch (weather) {
    case 0:
      content = (
        <ParticleSource
          area={{ x: 0, y: 0, width: 0, height: 200 }}
          angle={{ x: 1, y: 0 }}
          angle_range={0.05}
          frequency={2000}
          duration={20000}
          speed={1000}
          size={100}
          size_range={50}
        >
          <img
            style={{ height: "fill", width: "fill" }}
            src={"/backgrounds/cloud.svg"}
            alt="cloud"
          />
          <ParticleSource
            area={{ x: 0, y: 0, width: 200, height: 0 }}
            angle={{ x: 0, y: 1 }}
            angle_range={0.05}
            frequency={1000 / 6}
            duration={2000}
            speed={400}
            size={50}
            size_range={25}
          >
            <CatDog />
          </ParticleSource>
        </ParticleSource>
      );
      break;
    case 1:
      content = (
        <ParticleSource
          area={{ x: 100, y: 100, width: 500, height: 250 }}
          angle={{ x: 1, y: 0 }}
          angle_range={1}
          frequency={2000}
          duration={10000}
          speed={1000}
          size={50}
          size_range={25}
        >
          <img
            style={{ height: "fill", width: "fill" }}
            src={"/trash_bee.png"}
            alt="cloud"
          />
        </ParticleSource>
      );
      break;
    case 2:
      break;
    case 3:
      content = (
        <ParticleSource
          area={{ x: 0, y: 0, width: 1000, height: 0 }}
          angle={{ x: 0, y: 1 }}
          angle_range={0.05}
          frequency={1000 / 6}
          duration={2000}
          speed={400}
          size={50}
          size_range={25}
        >
          <CatDog />
        </ParticleSource>
      );
      break;
    case 4:
      content = (
        <ParticleSource
          area={{ x: 0, y: 0, width: 1000, height: 0 }}
          angle={{ x: 0, y: 1 }}
          angle_range={0.05}
          frequency={1000 / 24}
          duration={150}
          speed={0}
          size={500}
        >
          <motion.img
            style={{ height: "fill", width: "fill" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.1 }}
            src={
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Lightning_strike_jan_2007.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"
            }
            alt="cloud"
          />
        </ParticleSource>
      );
      break;
  }
  return (
    <div
      style={{
        zIndex: -3,
        position: "absolute",
        left: "2vw",
        height: "30vw",
        width: "50vw",
        backgroundImage: `url("https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Fields_and_Racecourse_-_geograph.org.uk_-_7017115.jpg/960px-Fields_and_Racecourse_-_geograph.org.uk_-_7017115.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail")`,
        backgroundSize: `contain`,
        backgroundRepeat: `no-repeat`,
      }}
    >
      {content}
    </div>
  );
}
