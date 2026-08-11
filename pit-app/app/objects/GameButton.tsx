import Image from "next/image";

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
  return (
    <button
      onClick={() => {
        setWindows([...windows, <iframe src={src}></iframe>]);
      }}
      id={`${src} button`}
    >
      <Image width={400} height={300} src={img} alt={img} draggable="false" />
    </button>
  );
}
