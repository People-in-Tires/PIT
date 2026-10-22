"use client";

import { IGameInstance } from "../UI/GameButton";
import { useContext } from "react";
import { LobbyContext } from "@/context/lobby";
import MaskedImage from "../MaskedImage";
import AttachmentPoint from "../AttachmentPoint";
import useCarStore from "../engine/carStore";
import React from "react";

export default function FuelGame({}: IGameInstance) {
  const car = useCarStore().in_stop;
  const { team } = useContext(LobbyContext);

  return (
    <React.Fragment>
      <MaskedImage
        src="/backgrounds/minigames/fuelgame/backcar_line.svg"
        maskSrc="/backgrounds/minigames/fuelgame/backcar_mask.svg"
        color={team.color}
      />
      <MaskedImage
        src="/backgrounds/minigames/fuelgame/driver_line.svg"
        maskSrc="/backgrounds/minigames/fuelgame/driver_mask.svg"
        color={team.color}
      />
      <MaskedImage
        src="/backgrounds/minigames/fuelgame/frontcar_line.svg"
        maskSrc="/backgrounds/minigames/fuelgame/frontcar_mask.svg"
        color={team.color}
      />
      <img
        src={"/elements/buttons/fuel.svg"} 
        style={{ height: "25%", left: "37.5%", top: "50%", width: "25%" }}
      />
      <AttachmentPoint
        tag={"fuelhole"}
        parentOffset={{ x: 5, y: 15 }}
        style={{ height: "25%", left: "37.5%", top: "50%", width: "25%" }}
      />
    </React.Fragment>
  );
}
