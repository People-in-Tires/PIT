import { IGameInstance } from "../UI/GameButton";
import AttachmentPoint from "../AttachmentPoint";
import MaskedImage from "../MaskedImage";
import { useContext } from "react";
import { LobbyContext } from "@/context/lobby";

export default function WheelGame({ slot }: IGameInstance) {
  const { team } = useContext(LobbyContext);

  return (
    <div
      style={{
        backgroundImage:
          "url(/backgrounds/minigames/wheelgame/wheel_background.svg)",
        backgroundSize: "100%",
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
    >
      <MaskedImage
        src={"/backgrounds/minigames/wheelgame/wheel_car_line.svg"}
        maskSrc={"/backgrounds/minigames/wheelgame/wheel_car_mask.svg"}
        color={team.color}
      />
      <AttachmentPoint
        tag={`spoke-${slot}`}
        parentOffset={{ x: 2.5, y: 1.5 }}
        style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
      />
    </div>
  );
}
