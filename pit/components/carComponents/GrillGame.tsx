"use client";
import { useEffect } from "react";
import useItemStore from "../engine/itemStore";
import useCarStore from "../engine/carStore";
import { IGameInstance } from "../UI/GameButton";

export default function GrillGame({ slot }: IGameInstance) {
  const container = useCarStore().tag;
  const items = useItemStore().items.filter(
    (value) => value.container === container && value.invSlot === slot,
  );

  useEffect(() => {
    useCarStore.getState().setLitter(items.length);
  }, [items.length]);

  return (
    <div
      id="Grill"
      style={{
        position: "absolute",
        width: "80%",
        height: "80%",
        left: "10%",
        top: "10%",
        backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/CarGrill_0712_9128_%288314048101%29.jpg/960px-CarGrill_0712_9128_%288314048101%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail")`,
        backgroundSize: `contain`,
        backgroundRepeat: `no-repeat`,
      }}
    >
      {items.length}
    </div>
  );
}
