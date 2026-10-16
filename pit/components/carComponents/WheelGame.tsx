import { IGameInstance } from "../UI/GameButton";
import AttachmentPoint from "../AttachmentPoint";

export default function WheelGame({ slot }: IGameInstance) {
  return (
    <div>
      <AttachmentPoint
        tag={`spoke-${slot}`}
        parentOffset={{x: 1.5, y: 0}}
        style={{ width: "20%", height: "20%", left: "40%", top: "40%" }}
      />
    </div>
  );
}
