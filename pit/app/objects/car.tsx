"use client";

import { useState, createRef } from "react";
import Image from "next/image";
import GameButton, {GameWindow} from "./GameButton";
import GrillGame from "../minigames/grill/page";

//class we get from rust
export class CarClass {
  litter: number;

  constructor() {
    this.litter = 20;
  }
}

export default function Car({id} : {id : number}) {
  //load car from 
  const carInfo = createRef<CarClass>();
  carInfo.current = new CarClass;
  const [gameWindows, setGameWindows] = useState<boolean[]>([false])
  const handleUpdate = (index : number) => {
    const newTodos = [...gameWindows];
    newTodos[index] = !newTodos[index];
  setGameWindows(newTodos);
  }
  return (
    <div>
      <GameButton 
        img="/grill.png"
        setBool={handleUpdate}
        open={gameWindows[0]}
        id={0}
      />
      {gameWindows[0] && <GameWindow 
        child={<GrillGame 
          metadata={{"litter": carInfo.current.litter}}
          setOutput={(input : number)=>{if (carInfo.current) carInfo.current.litter = input}}
          />}
        setBool={handleUpdate}
        id = {0}
        />}

      <Image 
        src={"/car2.png"}
        width={400}
        height={400}
        alt={"carbase"}
      />
    </div>
  )
}
