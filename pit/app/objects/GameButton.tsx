import Image from "next/image";
import styles from "../Index.module.css";
import { createRef, useContext, useState } from "react";
import Draggable from "react-draggable";
import { useEffect } from "react";
import { GameWindowContext } from "../page";

export default function GameButton({
  src,
  img,
  metadata,
  setOutput,
}: {
  src: string;
  img: string;
  metadata: string;
  setOutput: (output: MessageEvent<number>) => void;
}) {
  const ref = createRef<HTMLDivElement>();
  const [open, setOpen] = useState<boolean>(false);
  const gamewindow = useContext(GameWindowContext);

  useEffect(() => {
    window.addEventListener("message", setOutput, false);
    return () => {
      window.removeEventListener("message", setOutput, false);
    };
  }, [setOutput]);

  if (gamewindow == null) return;
  return (
    <button
      disabled={open}
      onClick={() => {
        gamewindow.setState([
          ...gamewindow.state,
          <Draggable key={`${src}_window`} handle={`#handle`} nodeRef={ref}>
            <div ref={ref}>
              <header id={`handle`} className={`${styles.GameFrameHeader}`}>
                <button
                  onClick={() => {
                    setOpen(false);
                    gamewindow.setState(
                      gamewindow.state.filter(
                        (item) => item.key != `${src} window`,
                      ),
                    );
                  }}
                >
                  <Image
                    width={20}
                    height={20}
                    src={"/window.svg"}
                    alt={"close"}
                  />
                </button>
              </header>
              <iframe
                id={`${src} iframe`}
                className={`${styles.GameFrame}`}
                src={`${src}?${metadata}`}
              ></iframe>
            </div>
          </Draggable>,
        ]);
        setOpen(true);
      }}
      id={`${src} button`}
    >
      <div>
        <Image
          width={400}
          height={300}
          src={img}
          alt={img}
          draggable="false"
        />{" "}
      </div>
    </button>
  );
}
