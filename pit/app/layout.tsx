import "./globals.css";
import type { Metadata } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import { auth } from "./lib/auth";
import { prisma } from "./lib/prisma";
import { getThemeId, getThemeMode } from "./lib/themes";
import ChatWidget from "@/components/chat/ChatWidget";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "PIT",
  description: "People In Tires",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userId = session?.user?.id;

  const user = userId
    ? await prisma.user.findUnique({
        where: { id: userId },
        select: { theme: true, themeMode: true },
      })
    : null;

  return (
    <html
      lang="en"
      data-theme={getThemeId(user?.theme)}
      data-mode={getThemeMode(user?.themeMode)}
      className={`${archivo.variable} ${archivoBlack.variable}`}
    >
      <body>
        {children}
        {userId && <ChatWidget currentUserId={userId} />}
      </body>
    </html>
  );
}