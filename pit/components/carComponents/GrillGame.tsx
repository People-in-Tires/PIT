"use client";
import { useEffect } from "react";
import useItemStore from "../engine/itemStore";
import useCarStore from "../engine/carStore";
import { IGameInstance } from "../UI/GameButton";
import MaskedImage from "../MaskedImage";
import { useContext } from "react";
import { LobbyContext } from "@/context/lobby";
import React from "react";

export default function GrillGame({ slot }: IGameInstance) {
  const container = useCarStore().tag;
  const { team } = useContext(LobbyContext);

  return (
    <React.Fragment>
      <MaskedImage
        src={"/backgrounds/minigames/grillgame/grill_line.svg"}
        maskSrc={"/backgrounds/minigames/grillgame/grill_mask.svg"}
        color={team.color}
      />
    </React.Fragment>
  );
}
