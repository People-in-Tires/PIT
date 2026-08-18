import Image from "next/image";
import styles from "../Index.module.css";
import { createRef, useState } from "react";
import Draggable from "react-draggable";

export default function GameButton({
  src,
  img,
  windows,
  setWindows,
}: {
  src: string;
  img: string;
  windows: React.JSX.Element[];
  /*change to context*/ setWindows: React.Dispatch<
    React.SetStateAction<React.JSX.Element[]>
  >;
}) {
  const ref = createRef<HTMLDivElement>();
  const [open, setOpen] = useState<boolean>(false);
  let litter: number = 0;
  window.addEventListener("message", (event) => {
    litter = event.data;
    console.log(litter);
  });

  return (
    <button //todo on close
      disabled={open}
      onClick={() => {
        setWindows([
          ...windows,
          <Draggable key={window.length} handle={"#handle"} nodeRef={ref}>
            <div ref={ref}>
              <header id={"handle"} className={`${styles.GameFrameHeader}`}>
                <button
                  onClick={() => {
                    setOpen(false);
                    ref.current?.parentNode?.removeChild(ref.current);
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
              <iframe className={`${styles.GameFrame}`} src={src}></iframe>
            </div>
          </Draggable>,
        ]);
        setOpen(true);
      }}
      id={`${src} button`}
    >
      <div>
        {litter}
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
