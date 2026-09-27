import MiniMap from "@/components/MiniMap";
import { prisma } from "@/app/lib/prisma";

export default async function Page() {
  const data = prisma.raceState.findMany().then((data) => {
    return data.reduce((prev, current) =>
      prev.timestamp > current.timestamp ? prev : current,
    );
  });
  console.log(data);
  return <MiniMap state={data} />;
}
