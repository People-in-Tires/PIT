import { ViewManager } from "@/components/engine/ViewManager";
import Lobby from "@/context/lobby";
import Simulation from "@/context/simulation";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export default async function Home() {
  const session = await auth();

  const user = session?.user?.id
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
      })
    : null;

  return (
    <Lobby>
      <Simulation>
        <ViewManager
          initialView="garage"
          isLoggedIn={!!user}
        />
      </Simulation>
    </Lobby>
  );
}