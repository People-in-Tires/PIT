"use client";

export default function ClickButton({
  children,
  type,
  text,
}: {
  children: React.ReactNode;
  type: "submit" | "button";
  text: string;
}) {
  return (
    <button type={type} onClick={() => text}>
      {children}
    </button>
  );
}
